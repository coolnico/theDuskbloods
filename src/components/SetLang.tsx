export default function SetLang({ locale }: { locale: string }) {
  // Blocking script so crawlers/users get the right <html lang> before paint,
  // not only after hydration.
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang=${JSON.stringify(locale)};`,
      }}
    />
  );
}
