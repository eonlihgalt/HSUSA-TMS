# HSUSA-TMS Worklist

## Backlog

- Add a user-switching/logout control so an operator can change the active user without restarting the application.

## Current priority

- Enforce Administrator authorization in Electron IPC handlers.
- Record audit entries for administrative user actions.
- Protect the last Administrator account from deletion.

## Later security hardening

- Replace plain-text password comparison/storage with a password hashing strategy.
- Add actor/user identity and before/after details to audit records.
- Enforce authorization consistently for roles, subjects, and question administration.
