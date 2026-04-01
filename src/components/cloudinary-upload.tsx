"use client";

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

type CloudinaryResult = {
  info: {
    secure_url: string;
  };
};

/* ── Single image upload ── */
export function CloudinaryUpload({
  value,
  onChange,
  label,
  folder,
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
}) {
  return (
    <div>
      {label && (
        <label className="mb-1 block text-[12px] font-semibold text-[#374151]">
          {label}
        </label>
      )}

      <div className="flex items-center gap-3">
        {/* Preview */}
        {value && (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#e5e7eb] bg-[#f4f5f7]">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        )}

        <CldUploadWidget
          signatureEndpoint="/api/cloudinary/sign"
          options={{
            folder: folder ?? "mymy-store",
            maxFiles: 1,
            resourceType: "image",
          }}
          onSuccess={(result) => {
            const r = result as CloudinaryResult;
            if (r.info?.secure_url) {
              onChange(r.info.secure_url);
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="rounded-lg border border-dashed border-[#c4a95a] px-4 py-2 text-[12px] font-semibold text-[#c4a95a] transition-colors hover:bg-[#c4a95a]/5"
            >
              {value ? "Change Image" : "Upload Image"}
            </button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
}

/* ── Gallery (multi) image upload ── */
export function CloudinaryGalleryUpload({
  value,
  onChange,
  label,
  folder,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  folder?: string;
}) {
  function removeImage(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  return (
    <div>
      {label && (
        <label className="mb-2 block text-[12px] font-semibold text-[#374151]">
          {label}
        </label>
      )}

      <div className="flex flex-wrap gap-2">
        {/* Existing thumbnails */}
        {value.map((url, idx) => (
          <div
            key={idx}
            className="group relative h-16 w-16 overflow-hidden rounded-lg border border-[#e5e7eb] bg-[#f4f5f7]"
          >
            <Image
              src={url}
              alt={`Gallery ${idx + 1}`}
              fill
              className="object-cover"
              sizes="64px"
            />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove image"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}

        {/* Upload button */}
        <CldUploadWidget
          signatureEndpoint="/api/cloudinary/sign"
          options={{
            folder: folder ?? "mymy-store/gallery",
            maxFiles: 5,
            resourceType: "image",
          }}
          onSuccess={(result) => {
            const r = result as CloudinaryResult;
            if (r.info?.secure_url) {
              onChange([...value, r.info.secure_url]);
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-[#c4a95a] text-[#c4a95a] transition-colors hover:bg-[#c4a95a]/5"
              aria-label="Add images"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
}
