export default function ColorDemo() {
  const colors = [
    { name: 'primary (default)', class: 'bg-primary' },
    { name: 'primary-50', class: 'bg-primary-50' },
    { name: 'primary-100', class: 'bg-primary-100' },
    { name: 'primary-200', class: 'bg-primary-200' },
    { name: 'primary-300', class: 'bg-primary-300' },
    { name: 'primary-400', class: 'bg-primary-400' },
    { name: 'primary-500', class: 'bg-primary-500' },
    { name: 'primary-600', class: 'bg-primary-600' },
    { name: 'primary-700', class: 'bg-primary-700' },
    { name: 'primary-800', class: 'bg-primary-800' },
    { name: 'primary-900', class: 'bg-primary-900' },
  ];

  return (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">Primary Color Palette Test</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {colors.map((color) => (
          <div key={color.name} className="flex items-center space-x-3">
            <div
              className={`h-16 w-16 rounded-lg ${color.class} border border-gray-300`}
            ></div>
            <div>
              <div className="font-medium">{color.name}</div>
              <div className="text-sm text-gray-600">{color.class}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-xl font-semibold">Text Colors</h3>
        <div className="space-y-2">
          <p className="text-primary">This is text-primary (#EA8934)</p>
          <p className="text-primary-600">This is text-primary-600 (#B55D1F)</p>
          <p className="text-primary-700">This is text-primary-700 (#934818)</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-xl font-semibold">Button Examples</h3>
        <div className="flex flex-wrap gap-4">
          <button className="rounded-lg bg-primary px-6 py-2 text-white transition-colors hover:bg-primary-600">
            Primary Button
          </button>
          <button className="rounded-lg bg-primary-100 px-6 py-2 text-primary-700 transition-colors hover:bg-primary-200">
            Light Primary
          </button>
          <button className="rounded-lg border border-primary px-6 py-2 text-primary transition-colors hover:bg-primary-50">
            Outline Primary
          </button>
        </div>
      </div>
    </div>
  );
}
