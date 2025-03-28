![Tests passed successfully](https://img.shields.io/badge/tests-67%20passed%2C%2012%20skipped-success)
<details><summary>Expand for details</summary>
 
|Report|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|fixtures/external/SilentNotes.trx|67 ✅||12 ⚪|1s|
## ✅ <a id="user-content-r0" href="#user-content-r0">fixtures/external/SilentNotes.trx</a>
**79** tests were completed in **1s** with **67** passed, **0** failed and **12** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[VanillaCloudStorageClientTest.CloudStorageCredentialsTest](#user-content-r0s0)|6 ✅|||30ms|
|[VanillaCloudStorageClientTest.CloudStorageProviders.DropboxCloudStorageClientTest](#user-content-r0s1)|2 ✅||3 ⚪|101ms|
|[VanillaCloudStorageClientTest.CloudStorageProviders.FtpCloudStorageClientTest](#user-content-r0s2)|4 ✅||3 ⚪|166ms|
|[VanillaCloudStorageClientTest.CloudStorageProviders.GmxCloudStorageClientTest](#user-content-r0s3)|2 ✅|||7ms|
|[VanillaCloudStorageClientTest.CloudStorageProviders.GoogleCloudStorageClientTest](#user-content-r0s4)|1 ✅||3 ⚪|40ms|
|[VanillaCloudStorageClientTest.CloudStorageProviders.OnedriveCloudStorageClientTest](#user-content-r0s5)|1 ✅||3 ⚪|15ms|
|[VanillaCloudStorageClientTest.CloudStorageProviders.WebdavCloudStorageClientTest](#user-content-r0s6)|5 ✅|||16ms|
|[VanillaCloudStorageClientTest.CloudStorageTokenTest](#user-content-r0s7)|9 ✅|||0ms|
|[VanillaCloudStorageClientTest.OAuth2.AuthorizationResponseErrorTest](#user-content-r0s8)|3 ✅|||3ms|
|[VanillaCloudStorageClientTest.OAuth2.OAuth2UtilsTest](#user-content-r0s9)|9 ✅|||12ms|
|[VanillaCloudStorageClientTest.OAuth2CloudStorageClientTest](#user-content-r0s10)|5 ✅|||13ms|
|[VanillaCloudStorageClientTest.SecureStringExtensionsTest](#user-content-r0s11)|7 ✅|||0ms|
|[VanillaCloudStorageClientTest.SerializeableCloudStorageCredentialsTest](#user-content-r0s12)|13 ✅|||43ms|
### ✅ <a id="user-content-r0s0" href="#user-content-r0s0">VanillaCloudStorageClientTest.CloudStorageCredentialsTest</a>
```
✅ AreEqualWorksWithDifferentPassword
✅ AreEqualWorksWithSameContent
✅ CorrectlyConvertsSecureStringToString
✅ CorrectlyConvertsStringToSecureString
✅ ValidateAcceptsValidCredentials
✅ ValidateRejectsInvalidCredentials
```
### ✅ <a id="user-content-r0s1" href="#user-content-r0s1">VanillaCloudStorageClientTest.CloudStorageProviders.DropboxCloudStorageClientTest</a>
```
✅ FileLifecycleWorks
⚪ ReallyDoFetchToken
⚪ ReallyDoOpenAuthorizationPageInBrowser
⚪ ReallyDoRefreshToken
✅ ThrowsAccessDeniedExceptionWithInvalidToken
```
### ✅ <a id="user-content-r0s2" href="#user-content-r0s2">VanillaCloudStorageClientTest.CloudStorageProviders.FtpCloudStorageClientTest</a>
```
✅ FileLifecycleWorks
✅ SanitizeCredentials_ChangesInvalidPrefix
✅ SecureSslConnectionWorks
✅ ThrowsWithHttpInsteadOfFtp
⚪ ThrowsWithInvalidPassword
⚪ ThrowsWithInvalidUrl
⚪ ThrowsWithInvalidUsername
```
### ✅ <a id="user-content-r0s3" href="#user-content-r0s3">VanillaCloudStorageClientTest.CloudStorageProviders.GmxCloudStorageClientTest</a>
```
✅ ChoosesCorrectUrlForGmxComEmail
✅ ChoosesCorrectUrlForGmxNetEmail
```
### ✅ <a id="user-content-r0s4" href="#user-content-r0s4">VanillaCloudStorageClientTest.CloudStorageProviders.GoogleCloudStorageClientTest</a>
```
✅ FileLifecycleWorks
⚪ ReallyDoFetchToken
⚪ ReallyDoOpenAuthorizationPageInBrowser
⚪ ReallyDoRefreshToken
```
### ✅ <a id="user-content-r0s5" href="#user-content-r0s5">VanillaCloudStorageClientTest.CloudStorageProviders.OnedriveCloudStorageClientTest</a>
```
✅ FileLifecycleWorks
⚪ ReallyDoFetchToken
⚪ ReallyDoOpenAuthorizationPageInBrowser
⚪ ReallyDoRefreshToken
```
### ✅ <a id="user-content-r0s6" href="#user-content-r0s6">VanillaCloudStorageClientTest.CloudStorageProviders.WebdavCloudStorageClientTest</a>
```
✅ FileLifecycleWorks
✅ ParseGmxWebdavResponseCorrectly
✅ ParseStratoWebdavResponseCorrectly
✅ ThrowsWithInvalidPath
✅ ThrowsWithInvalidUsername
```
### ✅ <a id="user-content-r0s7" href="#user-content-r0s7">VanillaCloudStorageClientTest.CloudStorageTokenTest</a>
```
✅ AreEqualWorksWithNullDate
✅ AreEqualWorksWithSameContent
✅ NeedsRefreshReturnsFalseForTokenFlow
✅ NeedsRefreshReturnsFalseIfNotExpired
✅ NeedsRefreshReturnsTrueIfExpired
✅ NeedsRefreshReturnsTrueIfNoExpirationDate
✅ SetExpiryDateBySecondsWorks
✅ SetExpiryDateBySecondsWorksWithNull
✅ SetExpiryDateBySecondsWorksWithVeryShortPeriod
```
### ✅ <a id="user-content-r0s8" href="#user-content-r0s8">VanillaCloudStorageClientTest.OAuth2.AuthorizationResponseErrorTest</a>
```
✅ ParsesAllErrorCodesCorrectly
✅ ParsesNullErrorCodeCorrectly
✅ ParsesUnknownErrorCodeCorrectly
```
### ✅ <a id="user-content-r0s9" href="#user-content-r0s9">VanillaCloudStorageClientTest.OAuth2.OAuth2UtilsTest</a>
```
✅ BuildAuthorizationRequestUrlEscapesParameters
✅ BuildAuthorizationRequestUrlLeavesOutOptionalParameters
✅ BuildAuthorizationRequestUrlThrowsWithMissingRedirectUrlForTokenFlow
✅ BuildAuthorizationRequestUrlUsesAllParameters
✅ BuildAuthorizationRequestUrlUsesCodeVerifier
✅ ParseRealWorldDropboxRejectResponse
✅ ParseRealWorldDropboxSuccessResponse
✅ ParseRealWorldGoogleRejectResponse
✅ ParseRealWorldGoogleSuccessResponse
```
### ✅ <a id="user-content-r0s10" href="#user-content-r0s10">VanillaCloudStorageClientTest.OAuth2CloudStorageClientTest</a>
```
✅ BuildOAuth2AuthorizationRequestUrlWorks
✅ FetchTokenCanInterpretGoogleResponse
✅ FetchTokenReturnsNullForDeniedAccess
✅ FetchTokenThrowsWithWrongState
✅ RefreshTokenCanInterpretGoogleResponse
```
### ✅ <a id="user-content-r0s11" href="#user-content-r0s11">VanillaCloudStorageClientTest.SecureStringExtensionsTest</a>
```
✅ AreEqualsWorksCorrectly
✅ CorrectlyConvertsSecureStringToString
✅ CorrectlyConvertsSecureStringToUnicodeBytes
✅ CorrectlyConvertsSecureStringToUtf8Bytes
✅ CorrectlyConvertsStringToSecureString
✅ CorrectlyConvertsUnicodeBytesToSecureString
✅ CorrectlyConvertsUtf8BytesToSecureString
```
### ✅ <a id="user-content-r0s12" href="#user-content-r0s12">VanillaCloudStorageClientTest.SerializeableCloudStorageCredentialsTest</a>
```
✅ DecryptAfterDesrializationCanReadAllPropertiesBack
✅ DecryptAfterDesrializationRespectsNullProperties
✅ EncryptBeforeSerializationProtectsAllNecessaryProperties
✅ EncryptBeforeSerializationRespectsNullProperties
✅ SerializedDatacontractCanBeReadBack
✅ SerializedDatacontractDoesNotContainNullProperties
✅ SerializedDatacontractDoesNotContainPlaintextData
✅ SerializedJsonCanBeReadBack
✅ SerializedJsonDoesNotContainNullProperties
✅ SerializedJsonDoesNotContainPlaintextData
✅ SerializedXmlCanBeReadBack
✅ SerializedXmlDoesNotContainNullProperties
✅ SerializedXmlDoesNotContainPlaintextData
```
</details>