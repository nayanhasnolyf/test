"use client";

import Image from "next/image";
import { useRef } from "react";

type NccAchievementProps = {
  certificateAvailable: boolean;
};

export function NccAchievement({
  certificateAvailable,
}: NccAchievementProps) {
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
          aria-controls="cert-certificate-dialog"
          onClick={openDialog}
        >
          <span className="visually-hidden">
            View NCC photograph and certificate
          </span>
        </button>

        <div className="achievement-image-frame">
          <Image
            alt="NCC cadets posing together in uniform"
            className="achievement-image achievement-image--ncc"
            fill
            loading="lazy"
            sizes="(max-width: 600px) calc(100vw - 24px), (max-width: 1440px) 48vw, 680px"
            src="/images/achievements/ncc.jpeg"
          />
        </div>

        <figcaption className="achievement-caption">
          <h3 className="achievement-title">NCC &apos;C&apos; Certificate</h3>
          <p className="achievement-metadata">
            <span className="meta-accent">2023 &mdash; 2026</span>
          </p>
          <p className="achievement-description">
            Three years of leadership, discipline, team coordination and
            community service.
          </p>
        </figcaption>
      </figure>

      <dialog
        className="cert-dialog"
        id="cert-certificate-dialog"
        ref={dialogRef}
        aria-labelledby="cert-dialog-title"
        aria-describedby="cert-dialog-description"
        onClick={closeFromBackdrop}
        onClose={restoreFocus}
      >
        <div className="cert-dialog-panel">
          <div className="cert-dialog-header">
            <h2 className="cert-dialog-title" id="cert-dialog-title">
              NCC &apos;C&apos; Certificate
            </h2>
            <p className="visually-hidden" id="cert-dialog-description">
              Fullscreen viewer containing an NCC group photograph and certificate.
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
                  alt="NCC group photograph"
                  className="cert-dialog-image"
                  fill
                  loading="lazy"
                  sizes="(max-width: 860px) calc(100vw - 32px), 42vw"
                  src="/images/achievements/ncc.jpeg"
                />
              </div>
              <figcaption>NCC photograph</figcaption>
            </figure>

            <figure className="cert-dialog-media">
              <div className="cert-dialog-certificate-frame">
                {certificateAvailable ? (
                  <Image
                    alt="Scanned NCC C Certificate document"
                    className="cert-dialog-certificate"
                    fill
                    loading="lazy"
                    sizes="(max-width: 860px) calc(100vw - 32px), 50vw"
                    src="/images/achievements/ncc-certificate.jpg"
                  />
                ) : (
                  <span className="cert-certificate-fallback" role="status">
                    Certificate image unavailable
                  </span>
                )}
              </div>
              <figcaption>NCC certificate</figcaption>
            </figure>
          </div>
        </div>
      </dialog>
    </>
  );
}
