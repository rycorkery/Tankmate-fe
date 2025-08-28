export function Database() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Species Database</h1>
        <p className="text-slate-600">
          Research database for aquarium plants, fish, and other inhabitants. This section will
          contain detailed information about species compatibility, care requirements, and more.
        </p>
      </div>

      <div className="flex items-center justify-center h-96 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-slate-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="text-lg font-medium text-slate-900 mb-1">Coming Soon</h3>
          <p className="text-slate-500">Species database functionality will be implemented here.</p>
        </div>
      </div>
    </div>
  )
}
