import { getCategories } from "@/lib/actions/categories";
import {
  getFeaturedCategoryIds,
  getContactSettings,
  getSiteLanguage,
  getSocialLinks,
  getAdmins,
} from "@/lib/actions/settings";
import SettingsClient from "./settings-client";

export const revalidate = 0;

export default async function SettingsPage() {
  const [allCategories, initialFeaturedIds, initialContactInfo, initialLanguage, initialSocialLinks, adminList] =
    await Promise.all([
      getCategories(),
      getFeaturedCategoryIds(),
      getContactSettings(),
      getSiteLanguage(),
      getSocialLinks(),
      getAdmins(),
    ]);

  const validCategoryIds = new Set(allCategories.map((c) => c.id));
  const sanitizedFeaturedIds = initialFeaturedIds.filter((id) => validCategoryIds.has(id));

  return (
    <SettingsClient
      allCategories={allCategories}
      initialFeaturedIds={sanitizedFeaturedIds}
      initialContactInfo={initialContactInfo}
      initialLanguage={initialLanguage}
      initialSocialLinks={initialSocialLinks}
      initialAdmins={adminList}
    />
  );
}
