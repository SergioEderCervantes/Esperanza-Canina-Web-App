"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

const DialogContent = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm" />
      <AnimatePresence>
        <DialogPrimitive.Content
          {...props}
          asChild
          forceMount
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            key="dialog"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            aria-modal="true"
          >
            <div
              className={cn(
                "relative bg-white border border-neutral-100 shadow-2xl w-[92vw] max-w-2xl p-0 overflow-hidden rounded-2xl",
                "max-h-[92vh] overflow-y-auto",
                className
              )}
              style={
                {
                  paddingTop: "env(safe-area-inset-top)",
                  paddingBottom: "env(safe-area-inset-bottom)",
                  colorScheme: "light",
                  backgroundColor: "#ffffff",
                } as React.CSSProperties
              }
            >
              <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" />

              <DialogCloseButton />
              {children}
            </div>
          </motion.div>
        </DialogPrimitive.Content>
      </AnimatePresence>
    </DialogPrimitive.Portal>
  );
};

const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="px-8 pt-6 pb-2">{children}</div>
);

const DialogTitle = ({ children }: { children: React.ReactNode }) => (
  <DialogPrimitive.Title className="text-lg sm:text-xl font-semibold text-neutral-900">
    {children}
  </DialogPrimitive.Title>
);

const DialogDescription = ({ children }: { children: React.ReactNode }) => (
  <DialogPrimitive.Description className="mt-1 text-sm text-neutral-600">
    {children}
  </DialogPrimitive.Description>
);

const DialogCloseButton = () => (
  <DialogPrimitive.Close
    className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800 transition-transform duration-150 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-300 rounded-full p-1 z-20"
    aria-label="Cerrar diálogo"
  >
    <span className="sr-only">Cerrar</span>
    <X className="w-5 h-5" />
  </DialogPrimitive.Close>
);

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
};