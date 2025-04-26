import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  email: string;

  @Prop({ default: null })
  googleId?: string;

  @Prop()
  displayName?: string;

  @Prop({ default: 'https://www.gravatar.com/avatar/  ' })
  avatar?: string;

  @Prop()
  password: string;

  @Prop({ enum: ['none', 'Weekly', 'Starter', 'Growth'], default: 'none' })
  plan: string;

  @Prop({ default: 0 })
  creditsUsed: number;

  @Prop({ enum: [0, 20, 50, 100], default: 0 })
  monthlyThumbnailLimit: number;
  
  @Prop({ enum: ['weekly', 'monthly'], default: 'monthly' })
  subscriptionType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
