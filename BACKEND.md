# Backend Firebase

Luna works locally without Firebase. Cloud features stay unavailable until all
`EXPO_PUBLIC_FIREBASE_*` variables are provided during the Android build.

## Firebase Console

1. Create a Firebase project and register the Android application with package
   `com.luna.app`.
2. Enable Authentication. Do not enable anonymous accounts for a public release
   unless a deletion and migration path has been designed.
3. Create Firestore and Cloud Storage in the production location selected for
   the project.
4. Copy the Web app configuration values to a local `.env` file using
   `.env.example` as the template. These values are identifiers, not secrets;
   private credentials never belong in the mobile application.
5. Install Firebase CLI, sign in to the account that owns the project, then run:

```bash
firebase use --add
firebase deploy --only firestore:rules,storage
```

## Data model

- `users/{uid}`: account profile, readable and writable only by its owner.
- `users/{uid}/journal/{YYYY-MM-DD}`: journal entry, private to its owner.
- `users/{uid}/private/cycleSettings`: cycle configuration, private to its owner.
- `questions/{id}`: shared Q&A; authenticated users can read and create only
  their own posts.
- `users/{uid}/...` in Storage: profile files, private to their owner and
  limited to 5 MB.

## Before enabling sync

Implement a genuine authentication provider and use the Firebase user `uid` for
every cloud read and write. Until then, keep the local-first experience: it does
not send cycle or journal data to Firebase.

For Google Play, publish a privacy policy that explains local storage, optional
cloud sync, data deletion, and support contact details before collecting or
transmitting health information.

## Google Play Billing

Create a one-time product in Play Console with the exact product ID
`luna_premium_lifetime`. Activate it first in an internal testing release. The
application reads the price directly from Google Play and offers purchase
restoration for the Google account that made the purchase.

Before production, validate the purchase token with the Google Play Developer
API from a trusted backend, then store the entitlement against the authenticated
Firebase user. A mobile client must not be the sole authority for a paid
entitlement.