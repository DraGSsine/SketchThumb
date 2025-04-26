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

  @Prop({ enum: ['free', 'Basic', 'Pro'], default: 'free' })
  plan: string;

  @Prop({ default: 0 })
  creditsUsed: number;

  @Prop({ enum: [5, 50, 'unlimited'], default: 5 })
  monthlyCredits: number | string;
}

export const UserSchema = SchemaFactory.createForClass(User);
