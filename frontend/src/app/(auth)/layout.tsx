import { Header } from "@/components/Header";

export default function AuthLayout({ children }: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100">
        {children}
      </div>
    </div>
  );
}