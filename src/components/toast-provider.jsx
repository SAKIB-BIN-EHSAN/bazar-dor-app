"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return <div data-rht-toaster><Toaster position="top-center" toastOptions={{ duration: 3600 }} /></div>;
}