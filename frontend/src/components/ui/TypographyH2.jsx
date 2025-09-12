export function TypographyH2({className, children=""}) {
  return (
    <h2 className={`scroll-m-20 text-3xl! font-semibold m-0 tracking-tight first:mt-0 ${className}`}>
      {...children}
    </h2>
  )
}
