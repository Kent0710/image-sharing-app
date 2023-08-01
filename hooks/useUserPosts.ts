
import { TypePosts } from "@/types";
import {create} from 'zustand';

type State = {
    userPosts : TypePosts[];
};

type Action = {
    updateUserPosts : (userPosts : State["userPosts"]) => void;
};

export const useUserPosts = create<State & Action>((set) => ({
    userPosts : [],
    updateUserPosts : (fetchedUserPosts)=>set(() => ({ userPosts: fetchedUserPosts }))
}))