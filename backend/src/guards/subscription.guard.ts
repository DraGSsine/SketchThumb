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
    const userMonthlyThumbnailLimit = user.monthlyThumbnailLimit;
    
    // Check if user has a valid paid plan (Weekly, Starter, or Growth)
    if (!['Weekly', 'Starter', 'Growth'].includes(userPlan)) {
      throw new UnauthorizedException("You need a subscription plan to access this feature");
    }
    
    // Check if user has exceeded their thumbnail limit based on their plan
    if (userUsage >= Number(userMonthlyThumbnailLimit)) {
      throw new UnauthorizedException(`Your ${userPlan} plan limit of ${userMonthlyThumbnailLimit} thumbnails has been reached. Please upgrade your plan for more thumbnails.`);
    }

    return true;
  }
}
