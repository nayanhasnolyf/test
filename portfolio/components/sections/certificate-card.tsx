"use client";

import Image from "next/image";
import { useId, useRef } from "react";

type CertificateCardProps = {
  title: string;
  issuer: string;
  date: string;
  detail?: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  imageAvailable?: boolean;
};

export function CertificateCard({
  title,
  issuer,
  date,
  detail,
  credentialId,
  credentialUrl,
  image,
  imageAvailable = false,
}: CertificateCardProps) {
  const dialogId = useId();
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const hasViewer = Boolean(image && imageAvailable);
  const trimmedCredentialUrl = credentialUrl?.trim() ?? "";
  const hasCredentialUrl = Boolean(trimmedCredentialUrl);

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
      <article className="certificate-card">
        <div className="certificate-card-meta">
          <span className="certificate-issuer">{issuer}</span>
          <span className="certificate-date">{date}</span>
        </div>

        {credentialId ? (
          <p className="certificate-credential-id">
            Credential ID: {credentialId}
          </p>
        ) : null}

        <h4 className="certificate-title">{title}</h4>

        {detail ? <p className="certificate-detail">{detail}</p> : null}

        {hasViewer || hasCredentialUrl ? (
          <div className="certificate-actions">
            {hasViewer ? (
              <button
                ref={triggerRef}
                className="certificate-viewer-trigger"
                type="button"
                aria-haspopup="dialog"
                aria-controls={dialogId}
                onClick={openDialog}
              >
                <span className="certificate-action-label">
                  view certificate
                </span>
                <span className="certificate-link-arrow" aria-hidden="true">
                  &#8594;
                </span>
              </button>
            ) : null}

            {hasCredentialUrl ? (
              <a
                className="certificate-link"
                href={trimmedCredentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify ${title} credential, opens in a new tab`}
              >
                <span className="certificate-action-label">
                  verify credential
                </span>
                <span className="certificate-link-arrow" aria-hidden="true">
                  &#8594;
                </span>
              </a>
            ) : null}
          </div>
        ) : null}
      </article>

      {hasViewer && image ? (
        <dialog
          className="cert-dialog"
          id={dialogId}
          ref={dialogRef}
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          onClick={closeFromBackdrop}
          onClose={restoreFocus}
        >
          <div className="cert-dialog-panel">
            <div className="cert-dialog-header">
              <h2 className="cert-dialog-title" id={titleId}>
                {title}
              </h2>
              <p className="visually-hidden" id={descriptionId}>
                Fullscreen viewer for {title} certificate issued by {issuer}.
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

            <figure className="cert-dialog-media cert-dialog-single">
              <div className="cert-dialog-certificate-frame">
                <Image
                  alt={`${title} certificate issued by ${issuer}`}
                  className="cert-dialog-certificate"
                  fill
                  loading="lazy"
                  sizes="(max-width: 860px) calc(100vw - 32px), 80vw"
                  src={image}
                />
              </div>
              <figcaption>
                {issuer} &middot; {date}
              </figcaption>
            </figure>
          </div>
        </dialog>
      ) : null}
    </>
  );
}
