import { MultiSelectDropdown } from "@/components/multi-select-dropdown";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold mb-6">Multi-Select Dropdown</h1>
        <p className="text-muted-foreground mb-6">Выберите несколько элементов из списка</p>
        <MultiSelectDropdown />
      </div>
    </div>
  );
}
