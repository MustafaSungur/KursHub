import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
      role="alert"
    >
      <AlertCircle className="flex-shrink-0 inline w-5 h-5 mr-3" />
      <span className="sr-only">Error</span>
      <div>
        <span className="font-medium">Hata:</span> {message}
      </div>
    </div>
  );
}
