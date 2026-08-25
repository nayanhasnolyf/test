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

  return (
    <>
      <figure className="achievement achievement--interactive">
        <button
          className="achievement-dialog-trigger"
          type="button"
          aria-haspopup="dialog"
          aria-controls="ncc-certificate-dialog"
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
            sizes="(max-width: 600px) calc(100vw - 24px), (max-width: 1100px) 48vw, 24vw"
            src="/images/achievements/ncc.jpg"
          />
        </div>

        <figcaption className="achievement-caption">
          <h3 className="achievement-title">NCC &apos;C&apos; Certificate</h3>
          <p className="achievement-metadata">2023 &mdash; 2026</p>
          <p className="achievement-description">
            Three years of leadership, discipline, team coordination and
            community service.
          </p>
        </figcaption>
      </figure>

      <dialog
        className="ncc-dialog"
        id="ncc-certificate-dialog"
        ref={dialogRef}
        aria-labelledby="ncc-dialog-title"
        aria-describedby="ncc-dialog-description"
        onClick={closeFromBackdrop}
      >
        <div className="ncc-dialog-panel">
          <div className="ncc-dialog-header">
            <h2 className="ncc-dialog-title" id="ncc-dialog-title">
              NCC &apos;C&apos; Certificate
            </h2>
            <p className="visually-hidden" id="ncc-dialog-description">
              Fullscreen viewer containing an NCC group photograph and certificate.
            </p>
            <button
              className="ncc-dialog-close"
              type="button"
              aria-label="Close certificate viewer"
              title="Close viewer"
              onClick={closeDialog}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="ncc-dialog-media-grid">
            <figure className="ncc-dialog-media">
              <div className="ncc-dialog-photo-frame">
                <Image
                  alt="NCC group photograph"
                  className="ncc-dialog-image"
                  fill
                  loading="lazy"
                  sizes="(max-width: 860px) calc(100vw - 32px), 42vw"
                  src="/images/achievements/ncc.jpg"
                />
              </div>
              <figcaption>NCC photograph</figcaption>
            </figure>

            <figure className="ncc-dialog-media">
              <div className="ncc-dialog-certificate-frame">
                {certificateAvailable ? (
                  <Image
                    alt="Scanned NCC C Certificate document"
                    className="ncc-dialog-certificate"
                    fill
                    loading="lazy"
                    sizes="(max-width: 860px) calc(100vw - 32px), 50vw"
                    src="/images/achievements/ncc-certificate.jpg"
                  />
                ) : (
                  <span className="ncc-certificate-fallback" role="status">
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
