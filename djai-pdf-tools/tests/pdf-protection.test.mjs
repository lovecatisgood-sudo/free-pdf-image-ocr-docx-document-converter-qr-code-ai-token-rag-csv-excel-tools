import assert from "node:assert/strict";
import test from "node:test";
import { PDF } from "@libpdf/core";
import { PDFDocument } from "pdf-lib";

test("AES-256 output requires the configured password", async () => {
  const source = await PDFDocument.create();
  source.addPage([300, 400]);
  const sourceBytes = await source.save();

  const pdf = await PDF.load(sourceBytes);
  pdf.setProtection({
    userPassword: "DJTools-test-password",
    algorithm: "AES-256",
    permissions: { print: true, copy: false, modify: false }
  });
  const protectedBytes = await pdf.save({ compressStreams: true });

  const unauthenticated = await PDF.load(protectedBytes);
  assert.equal(unauthenticated.isEncrypted, true);
  assert.equal(unauthenticated.isAuthenticated, false);

  const authenticated = await PDF.load(protectedBytes, { credentials: "DJTools-test-password" });
  assert.equal(authenticated.isAuthenticated, true);
  assert.equal(authenticated.getSecurity().algorithm, "AES-256");
  assert.equal(authenticated.getPermissions().copy, false);
  assert.equal(authenticated.getPermissions().modify, false);
  assert.equal(authenticated.getPages().length, 1);
});
