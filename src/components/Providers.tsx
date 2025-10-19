"use client";
import { getUnreadMessageCount } from "@/app/actions/messageActions";
import useMessageStore from "@/hooks/useMessageStore";
import { useNotificationChannel } from "@/hooks/useNotificationChannel";
import { usePresenceChannel } from "@/hooks/usePresenceChannel";
import { HeroUIProvider } from "@heroui/react";
import React, { ReactNode, useCallback, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useShallow } from "zustand/shallow";

export default function Providers({
    children,
    userId,
    profileComplete,
}: {
    children: ReactNode;
    userId: string | null;
    profileComplete: boolean;
}) {
    const { updateUnreadCount } = useMessageStore(
        useShallow((state) => ({
            updateUnreadCount: state.updateUnreadCount,
        }))
    );

    const setUnreadCount = useCallback(
        (amount: number) => {
            updateUnreadCount(amount);
        },
        [updateUnreadCount]
    );

    useEffect(() => {
        if (userId) {
            getUnreadMessageCount()
                .then((count) => {
                    setUnreadCount(count);
                })
                .catch((err) => {
                    console.warn("Failed to get unread count:", err);
                });
        }
    }, [setUnreadCount, userId]);

    // Initialize real-time channels
    usePresenceChannel(userId, profileComplete);
    useNotificationChannel(userId, profileComplete);

    return (
        <HeroUIProvider>
            <ToastContainer
                position="bottom-right"
                hideProgressBar
                className="z-50"
            />
            {children}
        </HeroUIProvider>
    );
}
