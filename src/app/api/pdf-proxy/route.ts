import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');
  const filenameRaw = searchParams.get('filename') || 'document.pdf';
  // Trim and limit length
  const trimmed = filenameRaw.trim().slice(0, 150);
  // ASCII fallback: replace non-ASCII with '_'
  const asciiFallback =
    trimmed
      .normalize('NFKD')
      .replace(/[^\x20-\x7E]/g, '_') // drop non printable / non ASCII
      .replace(/[\\/\r\n"']/g, '_') // dangerous chars
      .replace(/\s+/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '') || 'document';
  const base = asciiFallback.toLowerCase().endsWith('.pdf')
    ? asciiFallback.replace(/\.pdf$/i, '')
    : asciiFallback;
  const safeAsciiFilename = `${base}.pdf`;

  // RFC 5987 / 6266 extended filename for UTF-8 supporting browsers
  // Encode raw (original trimmed) as UTF-8 percent-encoded
  const utf8Encoded = encodeURIComponent(
    trimmed.toLowerCase().endsWith('.pdf') ? trimmed : `${trimmed}.pdf`,
  );

  const contentDisposition = `attachment; filename="${safeAsciiFilename}"; filename*=UTF-8''${utf8Encoded}`;

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 },
    );
  }

  try {
    // Validate URL
    const parsedUrl = new URL(url);

    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return NextResponse.json(
        { error: 'Invalid URL protocol' },
        { status: 400 },
      );
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        Accept: 'application/pdf,application/octet-stream,*/*',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Failed to fetch PDF: ${response.status} ${response.statusText}`,
        },
        { status: response.status },
      );
    }

    // Get the content type
    const contentType =
      response.headers.get('content-type') || 'application/pdf';

    // Stream the PDF data
    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': arrayBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Disposition': contentDisposition,
        'X-Download-Options': 'noopen',
      },
    });
  } catch (error) {
    console.error('PDF proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch PDF' }, { status: 500 });
  }
}
