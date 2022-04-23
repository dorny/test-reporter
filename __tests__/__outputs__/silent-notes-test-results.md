![Tests passed successfully](https://img.shields.io/badge/tests-67%20passed%2C%2012%20skipped-success)
## :white_check_mark: <a id="user-content-r0" href="#r0">VanillaCloudStorageClientTest</a>
**79** tests were completed in **1s** with **67** passed, **0** failed and **12** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[VanillaCloudStorageClientTest.CloudStorageCredentialsTest](#r0s0)|6:white_check_mark:|||30ms|
|[VanillaCloudStorageClientTest.CloudStorageProviders.DropboxCloudStorageClientTest](#r0s1)|2:white_check_mark:||3:no_entry_sign:|101ms|
|[VanillaCloudStorageClientTest.CloudStorageProviders.FtpCloudStorageClientTest](#r0s2)|4:white_check_mark:||3:no_entry_sign:|166ms|
|[VanillaCloudStorageClientTest.CloudStorageProviders.GmxCloudStorageClientTest](#r0s3)|2:white_check_mark:|||7ms|
|[VanillaCloudStorageClientTest.CloudStorageProviders.GoogleCloudStorageClientTest](#r0s4)|1:white_check_mark:||3:no_entry_sign:|40ms|
|[VanillaCloudStorageClientTest.CloudStorageProviders.OnedriveCloudStorageClientTest](#r0s5)|1:white_check_mark:||3:no_entry_sign:|15ms|
|[VanillaCloudStorageClientTest.CloudStorageProviders.WebdavCloudStorageClientTest](#r0s6)|5:white_check_mark:|||16ms|
|[VanillaCloudStorageClientTest.CloudStorageTokenTest](#r0s7)|9:white_check_mark:|||0ms|
|[VanillaCloudStorageClientTest.OAuth2.AuthorizationResponseErrorTest](#r0s8)|3:white_check_mark:|||3ms|
|[VanillaCloudStorageClientTest.OAuth2.OAuth2UtilsTest](#r0s9)|9:white_check_mark:|||12ms|
|[VanillaCloudStorageClientTest.OAuth2CloudStorageClientTest](#r0s10)|5:white_check_mark:|||13ms|
|[VanillaCloudStorageClientTest.SecureStringExtensionsTest](#r0s11)|7:white_check_mark:|||0ms|
|[VanillaCloudStorageClientTest.SerializeableCloudStorageCredentialsTest](#r0s12)|13:white_check_mark:|||43ms|
### :white_check_mark: <a id="user-content-r0s0" href="#r0s0">VanillaCloudStorageClientTest.CloudStorageCredentialsTest</a>
```
:white_check_mark: AreEqualWorksWithDifferentPassword
:white_check_mark: AreEqualWorksWithSameContent
:white_check_mark: CorrectlyConvertsSecureStringToString
:white_check_mark: CorrectlyConvertsStringToSecureString
:white_check_mark: ValidateAcceptsValidCredentials
:white_check_mark: ValidateRejectsInvalidCredentials
```
### :white_check_mark: <a id="user-content-r0s1" href="#r0s1">VanillaCloudStorageClientTest.CloudStorageProviders.DropboxCloudStorageClientTest</a>
```
:white_check_mark: FileLifecycleWorks
:no_entry_sign: ReallyDoFetchToken
:no_entry_sign: ReallyDoOpenAuthorizationPageInBrowser
:no_entry_sign: ReallyDoRefreshToken
:white_check_mark: ThrowsAccessDeniedExceptionWithInvalidToken
```
### :white_check_mark: <a id="user-content-r0s2" href="#r0s2">VanillaCloudStorageClientTest.CloudStorageProviders.FtpCloudStorageClientTest</a>
```
:white_check_mark: FileLifecycleWorks
:white_check_mark: SanitizeCredentials_ChangesInvalidPrefix
:white_check_mark: SecureSslConnectionWorks
:white_check_mark: ThrowsWithHttpInsteadOfFtp
:no_entry_sign: ThrowsWithInvalidPassword
:no_entry_sign: ThrowsWithInvalidUrl
:no_entry_sign: ThrowsWithInvalidUsername
```
### :white_check_mark: <a id="user-content-r0s3" href="#r0s3">VanillaCloudStorageClientTest.CloudStorageProviders.GmxCloudStorageClientTest</a>
```
:white_check_mark: ChoosesCorrectUrlForGmxComEmail
:white_check_mark: ChoosesCorrectUrlForGmxNetEmail
```
### :white_check_mark: <a id="user-content-r0s4" href="#r0s4">VanillaCloudStorageClientTest.CloudStorageProviders.GoogleCloudStorageClientTest</a>
```
:white_check_mark: FileLifecycleWorks
:no_entry_sign: ReallyDoFetchToken
:no_entry_sign: ReallyDoOpenAuthorizationPageInBrowser
:no_entry_sign: ReallyDoRefreshToken
```
### :white_check_mark: <a id="user-content-r0s5" href="#r0s5">VanillaCloudStorageClientTest.CloudStorageProviders.OnedriveCloudStorageClientTest</a>
```
:white_check_mark: FileLifecycleWorks
:no_entry_sign: ReallyDoFetchToken
:no_entry_sign: ReallyDoOpenAuthorizationPageInBrowser
:no_entry_sign: ReallyDoRefreshToken
```
### :white_check_mark: <a id="user-content-r0s6" href="#r0s6">VanillaCloudStorageClientTest.CloudStorageProviders.WebdavCloudStorageClientTest</a>
```
:white_check_mark: FileLifecycleWorks
:white_check_mark: ParseGmxWebdavResponseCorrectly
:white_check_mark: ParseStratoWebdavResponseCorrectly
:white_check_mark: ThrowsWithInvalidPath
:white_check_mark: ThrowsWithInvalidUsername
```
### :white_check_mark: <a id="user-content-r0s7" href="#r0s7">VanillaCloudStorageClientTest.CloudStorageTokenTest</a>
```
:white_check_mark: AreEqualWorksWithNullDate
:white_check_mark: AreEqualWorksWithSameContent
:white_check_mark: NeedsRefreshReturnsFalseForTokenFlow
:white_check_mark: NeedsRefreshReturnsFalseIfNotExpired
:white_check_mark: NeedsRefreshReturnsTrueIfExpired
:white_check_mark: NeedsRefreshReturnsTrueIfNoExpirationDate
:white_check_mark: SetExpiryDateBySecondsWorks
:white_check_mark: SetExpiryDateBySecondsWorksWithNull
:white_check_mark: SetExpiryDateBySecondsWorksWithVeryShortPeriod
```
### :white_check_mark: <a id="user-content-r0s8" href="#r0s8">VanillaCloudStorageClientTest.OAuth2.AuthorizationResponseErrorTest</a>
```
:white_check_mark: ParsesAllErrorCodesCorrectly
:white_check_mark: ParsesNullErrorCodeCorrectly
:white_check_mark: ParsesUnknownErrorCodeCorrectly
```
### :white_check_mark: <a id="user-content-r0s9" href="#r0s9">VanillaCloudStorageClientTest.OAuth2.OAuth2UtilsTest</a>
```
:white_check_mark: BuildAuthorizationRequestUrlEscapesParameters
:white_check_mark: BuildAuthorizationRequestUrlLeavesOutOptionalParameters
:white_check_mark: BuildAuthorizationRequestUrlThrowsWithMissingRedirectUrlForTokenFlow
:white_check_mark: BuildAuthorizationRequestUrlUsesAllParameters
:white_check_mark: BuildAuthorizationRequestUrlUsesCodeVerifier
:white_check_mark: ParseRealWorldDropboxRejectResponse
:white_check_mark: ParseRealWorldDropboxSuccessResponse
:white_check_mark: ParseRealWorldGoogleRejectResponse
:white_check_mark: ParseRealWorldGoogleSuccessResponse
```
### :white_check_mark: <a id="user-content-r0s10" href="#r0s10">VanillaCloudStorageClientTest.OAuth2CloudStorageClientTest</a>
```
:white_check_mark: BuildOAuth2AuthorizationRequestUrlWorks
:white_check_mark: FetchTokenCanInterpretGoogleResponse
:white_check_mark: FetchTokenReturnsNullForDeniedAccess
:white_check_mark: FetchTokenThrowsWithWrongState
:white_check_mark: RefreshTokenCanInterpretGoogleResponse
```
### :white_check_mark: <a id="user-content-r0s11" href="#r0s11">VanillaCloudStorageClientTest.SecureStringExtensionsTest</a>
```
:white_check_mark: AreEqualsWorksCorrectly
:white_check_mark: CorrectlyConvertsSecureStringToString
:white_check_mark: CorrectlyConvertsSecureStringToUnicodeBytes
:white_check_mark: CorrectlyConvertsSecureStringToUtf8Bytes
:white_check_mark: CorrectlyConvertsStringToSecureString
:white_check_mark: CorrectlyConvertsUnicodeBytesToSecureString
:white_check_mark: CorrectlyConvertsUtf8BytesToSecureString
```
### :white_check_mark: <a id="user-content-r0s12" href="#r0s12">VanillaCloudStorageClientTest.SerializeableCloudStorageCredentialsTest</a>
```
:white_check_mark: DecryptAfterDesrializationCanReadAllPropertiesBack
:white_check_mark: DecryptAfterDesrializationRespectsNullProperties
:white_check_mark: EncryptBeforeSerializationProtectsAllNecessaryProperties
:white_check_mark: EncryptBeforeSerializationRespectsNullProperties
:white_check_mark: SerializedDatacontractCanBeReadBack
:white_check_mark: SerializedDatacontractDoesNotContainNullProperties
:white_check_mark: SerializedDatacontractDoesNotContainPlaintextData
:white_check_mark: SerializedJsonCanBeReadBack
:white_check_mark: SerializedJsonDoesNotContainNullProperties
:white_check_mark: SerializedJsonDoesNotContainPlaintextData
:white_check_mark: SerializedXmlCanBeReadBack
:white_check_mark: SerializedXmlDoesNotContainNullProperties
:white_check_mark: SerializedXmlDoesNotContainPlaintextData
```