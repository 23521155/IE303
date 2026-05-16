'use client';

import * as React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';

const CollapsibleContext = React.createContext<{ isOpen: boolean }>({ isOpen: false });

const Collapsible = React.forwardRef<
    React.ElementRef<typeof CollapsiblePrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>(({ children, open: openProp, onOpenChange, defaultOpen, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen ?? false);
    const isControlled = openProp !== undefined;
    const currentOpen = isControlled ? openProp : isOpen;

    const handleOpenChange = (open: boolean) => {
        if (!isControlled) setIsOpen(open);
        onOpenChange?.(open);
    };

    return (
        <CollapsiblePrimitive.Root open={currentOpen} onOpenChange={handleOpenChange} ref={ref} {...props}>
            <CollapsibleContext.Provider value={{ isOpen: currentOpen }}>
                {children}
            </CollapsibleContext.Provider>
        </CollapsiblePrimitive.Root>
    );
});
Collapsible.displayName = CollapsiblePrimitive.Root.displayName;

const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

const CollapsibleContent = React.forwardRef<
    React.ElementRef<typeof CollapsiblePrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => {
    const { isOpen } = React.useContext(CollapsibleContext);

    return (
        <CollapsiblePrimitive.Content ref={ref} forceMount {...props} asChild>
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        className={cn('overflow-hidden', className)}
                        initial={{ height: 0, opacity: 0, y: 10 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: 10 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                        <div>{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </CollapsiblePrimitive.Content>
    );
});
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
