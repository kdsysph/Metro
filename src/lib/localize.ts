type Lang = 'en' | 'am';

/**
 * Returns the Amharic variant of a CMS field when:
 *   - lang === 'am'
 *   - the `<field>_am` sibling exists and is non-empty
 * Otherwise returns the English (default) field value.
 *
 * Convention: Amharic fields in Sanity are named `<fieldName>_am`.
 * Example: `heroHeadlineText` → `heroHeadlineText_am`
 */
export function localizeField(
  data: Record<string, any> | null | undefined,
  field: string,
  lang: Lang
): any {
  if (!data) return undefined;

  if (lang === 'am') {
    const amValue = data[`${field}_am`];
    // Consider the value non-empty when it's a non-null, non-empty string,
    // or a non-empty array (Portable Text blocks).
    const isNonEmpty =
      amValue !== null &&
      amValue !== undefined &&
      amValue !== '' &&
      !(Array.isArray(amValue) && amValue.length === 0);

    if (isNonEmpty) return amValue;
  }

  return data[field];
}
