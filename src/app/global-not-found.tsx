export default function GlobalNotFound() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>404: This page could not be found. | Duskbloods Guide</title>
      </head>
      <body>
        <div className="site flex min-h-screen flex-col items-center justify-center px-4">
          <div className="py-24 text-center">
            <div className="font-heading text-6xl font-bold text-blood">404</div>
            <p className="mt-4 text-muted">Page not found.</p>
            <p className="mt-8">
              <a href="/" className="btn-primary">
                Back to Home
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
