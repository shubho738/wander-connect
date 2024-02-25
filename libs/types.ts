
import type { LucideIcon } from "lucide-react"


export interface User {

  id: string;
  name: string;
  username: string;
  email: string;
  hashedPassword?: string;
  about?: string;
  coverImage?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
  followingIds?: string[];
  bookmarks?: string[];
  notification?: boolean;
  numberOfFollowers?: number;
}


export interface UserBasic {

  id: string;
  name: string;
  username: string;
  email?: string;
}

export interface Journal {

  id: string;
  title: string;
  content: string;
  location: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}


export interface JournalBasic {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}


export interface Status {

  id: string;
  text: string;
  image?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  likedIds?: string[];
  comments?: Comment[];
  user?: UserBasic;
}


export interface StatusMetrics {

  starCount: number;
  commentCount: number;
}


export interface Comment {

  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  statusId: string;
  user?: UserBasic;
}


export interface Notification {

  id: string;
  title: string;
  createdAt: string;
  userId: string;
}


export type IconType = LucideIcon


