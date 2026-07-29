export const LoadingIndicator = () => {
  return (
    <svg className="h-16 w-16 animate-spin text-mist-500" viewBox="0 0 100 100">
      <circle
        fill="none"
        strokeWidth="10"
        className="stroke-current opacity-40"
        cx="50"
        cy="50"
        r="40"
      />
      <circle
        fill="none"
        strokeWidth="10"
        className="stroke-current"
        strokeDasharray="250"
        strokeDashoffset="210"
        cx="50"
        cy="50"
        r="40"
      />
    </svg>
  )
}