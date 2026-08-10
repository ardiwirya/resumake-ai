"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface RepeatableItemCardProps {
  title: string;
  onRemove: () => void;
  children: React.ReactNode;
}

export function RepeatableItemCard({
  title,
  onRemove,
  children,
}: RepeatableItemCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
    >
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <GripVertical className="h-4 w-4" />
              {title}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onRemove}
              aria-label={`Hapus ${title}`}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">{children}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
