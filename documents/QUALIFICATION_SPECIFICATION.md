# Qualification Specification

**Version:** 1.0  
**Status:** Authoritative  
**Owner:** HSUSA TMS  
**Effective date:** 2026-09-19  

## 1. Purpose

This document defines the authoritative behavior for qualification definitions, user assignments, visibility, expiration, history, and future approval workflow in HSUSA-TMS.

If application behavior conflicts with this document, this document takes precedence until a newer version is approved.

## 2. Qualification definitions

A qualification definition is a reusable catalog item. It may be assigned to zero, one, or many users.

Each definition contains:

- Name
- Description
- Issued date, when applicable
- Expiration date, when applicable
- Current status
- Assignment history

Creating a qualification definition does not assign it to a user. Assignment is a separate action performed from the user or qualification assignment view.

## 3. Assignment model

A user may have multiple qualifications, and a qualification may be assigned to multiple users.

An assignment must retain its history, including after it is no longer active. Completed, revoked, or removed assignments must not be permanently deleted.

Each assignment should retain, at minimum:

- User
- Qualification
- Date assigned
- Assigning actor, when actor tracking is available
- Active/revoked state
- Date revoked or completed, when applicable
- Revocation/completion reason, when provided

Removing a qualification from a user's active assignments changes the assignment's state to revoked or completed; it does not delete the historical record.

## 4. Status and expiration rules

Qualification status is calculated from the expiration date unless the qualification is manually suspended.

- A qualification with no expiration date remains `CURRENT` indefinitely.
- More than 30 days remain: `CURRENT`.
- 30 days or fewer remain, but more than 7 days remain: `EXPIRING`.
- 7 days or fewer remain, including the expiration date: `EXPIRING_CRITICAL`.
- The expiration date has passed: `EXPIRED`.
- A manually suspended qualification: `SUSPENDED`.
- `SUSPENDED` overrides all date-based statuses.

The application must display the 30-day warning and the 7-day critical warning distinctly. A critical warning does not by itself make the qualification invalid; it remains usable until the expiration date unless suspended by an authorized administrator.

## 5. Visibility and authorization

Non-Administrators may view:

- Qualification definitions
- Qualification assignments for roles and other permitted organizational views
- Their own qualification assignments

Administrators may additionally:

- Create, edit, and delete qualification definitions
- Assign and unassign qualifications
- Suspend or reinstate qualifications
- Correct assignment data

All changes to definitions, assignments, or status must create an audit entry.

The application must not expose password data or other restricted user administration data through qualification views.

## 6. Approval workflow

Approval workflow is deferred from version 1.0. No approval state, approval authority, approval queue, or approval requirement should be required for the initial implementation.

Approval behavior may be introduced in a later specification version after the business process is defined.

## 7. Readiness interpretation

For future readiness calculations:

- An active assignment to a `CURRENT` qualification satisfies the requirement.
- An active assignment to an `EXPIRING` or `EXPIRING_CRITICAL` qualification satisfies the requirement but produces a warning.
- An `EXPIRED`, `SUSPENDED`, revoked, or completed qualification does not satisfy the requirement.
- A missing required qualification means the user is not ready.
- Optional qualifications do not determine readiness.
- A qualification without an expiration date remains valid unless suspended or its assignment is revoked/completed.

## 8. Audit requirements

The system must record these events:

- Qualification created
- Qualification updated
- Qualification deleted
- Qualification assigned
- Qualification unassigned/revoked
- Qualification completed
- Qualification suspended
- Qualification reinstated

The long-term audit record should include:

- Actor
- Target user
- Qualification
- Previous value
- New value
- Timestamp
- Reason or comment

If some actor or before/after fields are not yet available, the event must still be recorded and the missing fields added in a later hardening phase.

## 9. Version history

| Version | Date | Status | Summary |
|---|---|---|---|
| 1.0 | 2026-09-19 | Authoritative | Defined reusable qualifications, many-to-many assignments, 30/7-day expiration warnings, visibility, retained assignment history, and deferred approval workflow. |
