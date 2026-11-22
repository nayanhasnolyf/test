"use client";

import Image from "next/image";
import { useRef } from "react";

type HacksurgexAchievementProps = {
  certificateAvailable: boolean;
};

export function HacksurgexAchievement({
  certificateAvailable,
}: HacksurgexAchievementProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function closeFromBackdrop(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      closeDialog();
    }
  }

  function restoreFocus() {
    triggerRef.current?.focus();
  }

  return (
    <>
      <figure className="achievement achievement--interactive">
        <button
          ref={triggerRef}
          className="achievement-dialog-trigger"
          type="button"
          aria-haspopup="dialog"
          aria-controls="hacksurgex-certificate-dialog"
          onClick={openDialog}
        >
          <span className="visually-hidden">
            View Hack SurgeX photograph and certificate
          </span>
        </button>

        <div className="achievement-image-frame">
          <Image
            alt="Hack SurgeX team receiving their runner-up certificate"
            className="achievement-image achievement-image--hacksurgex"
            fill
            loading="lazy"
            sizes="(max-width: 600px) calc(100vw - 24px), (max-width: 1440px) 48vw, 680px"
            src="/images/achievements/hacksurgex.jpg"
          />
        </div>

        <figcaption className="achievement-caption">
          <h3 className="achievement-title">Hack SurgeX</h3>
          <p className="achievement-metadata">
            Runner-up &middot; <span className="meta-accent">Mar 2026</span>
          </p>
          <p className="achievement-description">
            Secured 2nd place at a national hackathon by building MolGenix
            within 36 hours.
          </p>
        </figcaption>
      </figure>

      <dialog
        className="cert-dialog"
        id="hacksurgex-certificate-dialog"
        ref={dialogRef}
        aria-labelledby="hacksurgex-dialog-title"
        aria-describedby="hacksurgex-dialog-description"
        onClick={closeFromBackdrop}
        onClose={restoreFocus}
      >
        <div className="cert-dialog-panel">
          <div className="cert-dialog-header">
            <h2 className="cert-dialog-title" id="hacksurgex-dialog-title">
              Hack SurgeX
            </h2>
            <p className="visually-hidden" id="hacksurgex-dialog-description">
              Fullscreen viewer containing an Hack SurgeX photograph and certificate.
            </p>
            <button
              className="cert-dialog-close"
              type="button"
              aria-label="Close certificate viewer"
              title="Close viewer"
              onClick={closeDialog}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="cert-dialog-media-grid">
            <figure className="cert-dialog-media">
              <div className="cert-dialog-photo-frame">
                <Image
                  alt="Hack SurgeX photograph"
                  className="cert-dialog-image"
                  fill
                  loading="lazy"
                  sizes="(max-width: 860px) calc(100vw - 32px), 42vw"
                  src="/images/achievements/hacksurgex.jpg"
                />
              </div>
              <figcaption>Hack SurgeX photograph</figcaption>
            </figure>

            <figure className="cert-dialog-media">
              <div className="cert-dialog-certificate-frame">
                {certificateAvailable ? (
                  <Image
                    alt="Scanned Hack SurgeX Certificate document"
                    className="cert-dialog-certificate"
                    fill
                    loading="lazy"
                    sizes="(max-width: 860px) calc(100vw - 32px), 50vw"
                    src="/images/achievements/hacksurgex-certificate.jpeg"
                  />
                ) : (
                  <span className="cert-certificate-fallback" role="status">
                    Certificate image unavailable
                  </span>
                )}
              </div>
              <figcaption>Hack SurgeX certificate</figcaption>
            </figure>
          </div>
        </div>
      </dialog>
    </>
  );
}
