"use client";

import { useEffect } from "react";
import { trackLIMCFPageView } from "@/lib/limcf";

export function LIMCFPageTracker() {
  useEffect(() => {
    trackLIMCFPageView();
  }, []);

  return null;
}
