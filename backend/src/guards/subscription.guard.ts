import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/model/UserSchema';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    
    if (!userId) throw new UnauthorizedException('No user ID provided');

    const user = await this.userModel.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    
    const userPlan = user.plan;
    const userUsage = user.creditsUsed;
    const userMonthlyCredits = user.monthlyCredits;
    
    // Check if user has exceeded their credit limit
    const usageExceeded = userMonthlyCredits === 'unlimited' ? 
      false : 
      userUsage >= Number(userMonthlyCredits);
    
    if (!userPlan) {
      throw new UnauthorizedException("You don't have a subscription plan");
    }
    
    if (userPlan === 'none') {
      throw new UnauthorizedException('You do not have a subscription plan');
    }
    
    if (userPlan === 'free' && usageExceeded) {
      await this.userModel.findByIdAndUpdate(userId, { plan: 'none' });
      throw new UnauthorizedException('Free plan limit reached. Please upgrade your plan.');
    }
    
    if (userPlan === 'Basic' && usageExceeded) {
      await this.userModel.findByIdAndUpdate(userId, { plan: 'none' });
      throw new UnauthorizedException('Basic plan limit reached. Please upgrade to Pro.');
    }

    return true;
  }
}
