import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site-config';

/**
 * Dynamic Open Graph Image Generator
 * Generates OG images on-the-fly for SEO and social sharing
 *
 * Query parameters:
 * - title: Main heading (required)
 * - description: Subtitle/description (optional)
 * - type: 'default', 'blog', 'project' (optional)
 */

export const runtime = 'nodejs';

// Use system fonts available in the Edge Runtime
const fontData = [];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get('title') || siteConfig.name;
    const description = searchParams.get('description') || 'Full-Stack Developer • MERN • Next.js • Multilingual';
    const type = searchParams.get('type') || 'default';

    // Get appropriate colors and styling based on type
    const styles = getStylesByType(type);

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            padding: '60px',
            backgroundColor: styles.bgColor,
            color: styles.textColor,
            fontFamily: 'system-ui, -apple-system, "Segoe UI"',
          }}
        >
          {/* Top accent bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: styles.accentColor,
            }}
          />

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flexGrow: 1,
            }}
          >
            {/* Title */}
            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                lineHeight: '1.2',
                marginBottom: '40px',
                maxWidth: '90%',
                wordWrap: 'break-word',
              }}
            >
              {title}
            </div>

            {/* Description */}
            {description && (
              <div
                style={{
                  fontSize: '32px',
                  lineHeight: '1.4',
                  opacity: 0.8,
                  maxWidth: '90%',
                  wordWrap: 'break-word',
                }}
              >
                {description}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: `2px solid ${styles.accentColor}`,
              paddingTop: '30px',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                opacity: 0.7,
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                fontSize: '18px',
                opacity: 0.6,
              }}
            >
              farhanabdullah.dev
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: fontData.length > 0 ? fontData : undefined,
      }
    );
  } catch (error) {
    console.error('OG Image Generation Error:', error);

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            fontSize: '48px',
            fontWeight: 'bold',
          }}
        >
          {siteConfig.name}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}

/**
 * Get styling based on page type
 */
function getStylesByType(type) {
  const styles = {
    default: {
      bgColor: '#0a0a0a',
      textColor: '#ffffff',
      accentColor: '#3b82f6',
    },
    blog: {
      bgColor: '#1a1a2e',
      textColor: '#e0e0e0',
      accentColor: '#00d4ff',
    },
    project: {
      bgColor: '#0f1419',
      textColor: '#f5f5f5',
      accentColor: '#10b981',
    },
  };

  return styles[type] || styles.default;
}
