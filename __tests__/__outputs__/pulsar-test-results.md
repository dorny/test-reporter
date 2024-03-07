![Tests failed](https://img.shields.io/badge/tests-793%20passed%2C%201%20failed%2C%2014%20skipped-critical)
|Report|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|fixtures/external/java/pulsar-test-report.xml|793:white_check_mark:|1:x:|14:warning:|2127s|
## :x: <a id="user-content-r0" href="#r0">fixtures/external/java/pulsar-test-report.xml</a>
**808** tests were completed in **2127s** with **793** passed, **1** failed and **14** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[org.apache.pulsar.AddMissingPatchVersionTest](#r0s0)||1:x:|1:warning:|116ms|
|[org.apache.pulsar.broker.admin.AdminApiOffloadTest](#r0s1)|7:white_check_mark:|||19s|
|[org.apache.pulsar.broker.auth.AuthenticationServiceTest](#r0s2)|2:white_check_mark:|||185ms|
|[org.apache.pulsar.broker.auth.AuthLogsTest](#r0s3)|2:white_check_mark:|||1s|
|[org.apache.pulsar.broker.auth.AuthorizationTest](#r0s4)|1:white_check_mark:|||2s|
|[org.apache.pulsar.broker.lookup.http.HttpTopicLookupv2Test](#r0s5)|4:white_check_mark:|||2s|
|[org.apache.pulsar.broker.namespace.NamespaceCreateBundlesTest](#r0s6)|2:white_check_mark:|||33s|
|[org.apache.pulsar.broker.namespace.NamespaceOwnershipListenerTests](#r0s7)|2:white_check_mark:|||32s|
|[org.apache.pulsar.broker.namespace.NamespaceServiceTest](#r0s8)|10:white_check_mark:|||75s|
|[org.apache.pulsar.broker.namespace.NamespaceUnloadingTest](#r0s9)|2:white_check_mark:|||14s|
|[org.apache.pulsar.broker.namespace.OwnerShipCacheForCurrentServerTest](#r0s10)|1:white_check_mark:|||16s|
|[org.apache.pulsar.broker.namespace.OwnershipCacheTest](#r0s11)|8:white_check_mark:|||16s|
|[org.apache.pulsar.broker.protocol.ProtocolHandlersTest](#r0s12)|6:white_check_mark:|||946ms|
|[org.apache.pulsar.broker.protocol.ProtocolHandlerUtilsTest](#r0s13)|3:white_check_mark:|||7s|
|[org.apache.pulsar.broker.protocol.ProtocolHandlerWithClassLoaderTest](#r0s14)|1:white_check_mark:|||15ms|
|[org.apache.pulsar.broker.PulsarServiceTest](#r0s15)|2:white_check_mark:|||96ms|
|[org.apache.pulsar.broker.service.MessagePublishBufferThrottleTest](#r0s16)|3:white_check_mark:|||14s|
|[org.apache.pulsar.broker.service.ReplicatorTest](#r0s17)|22:white_check_mark:|||40s|
|[org.apache.pulsar.broker.service.TopicOwnerTest](#r0s18)|8:white_check_mark:|||114s|
|[org.apache.pulsar.broker.SLAMonitoringTest](#r0s19)|4:white_check_mark:|||9s|
|[org.apache.pulsar.broker.stats.BookieClientsStatsGeneratorTest](#r0s20)|2:white_check_mark:|||49ms|
|[org.apache.pulsar.broker.stats.ConsumerStatsTest](#r0s21)|3:white_check_mark:|||21s|
|[org.apache.pulsar.broker.stats.ManagedCursorMetricsTest](#r0s22)|1:white_check_mark:|||281ms|
|[org.apache.pulsar.broker.stats.ManagedLedgerMetricsTest](#r0s23)|1:white_check_mark:|||285ms|
|[org.apache.pulsar.broker.stats.prometheus.AggregatedNamespaceStatsTest](#r0s24)|1:white_check_mark:|||40ms|
|[org.apache.pulsar.broker.stats.PrometheusMetricsTest](#r0s25)|15:white_check_mark:|||83s|
|[org.apache.pulsar.broker.stats.SubscriptionStatsTest](#r0s26)|2:white_check_mark:|||2s|
|[org.apache.pulsar.broker.systopic.NamespaceEventsSystemTopicServiceTest](#r0s27)|1:white_check_mark:|||1s|
|[org.apache.pulsar.broker.transaction.buffer.InMemTransactionBufferReaderTest](#r0s28)|3:white_check_mark:|||28ms|
|[org.apache.pulsar.broker.transaction.buffer.TransactionBufferClientTest](#r0s29)|4:white_check_mark:|||93ms|
|[org.apache.pulsar.broker.transaction.buffer.TransactionBufferTest](#r0s30)|7:white_check_mark:|||81ms|
|[org.apache.pulsar.broker.transaction.buffer.TransactionEntryImplTest](#r0s31)|1:white_check_mark:|||14ms|
|[org.apache.pulsar.broker.transaction.buffer.TransactionLowWaterMarkTest](#r0s32)|2:white_check_mark:|||38s|
|[org.apache.pulsar.broker.transaction.buffer.TransactionStablePositionTest](#r0s33)|2:white_check_mark:||1:warning:|49s|
|[org.apache.pulsar.broker.transaction.coordinator.TransactionCoordinatorClientTest](#r0s34)|3:white_check_mark:|||95ms|
|[org.apache.pulsar.broker.transaction.coordinator.TransactionMetaStoreAssignmentTest](#r0s35)|1:white_check_mark:|||1s|
|[org.apache.pulsar.broker.transaction.pendingack.PendingAckInMemoryDeleteTest](#r0s36)|2:white_check_mark:||1:warning:|57s|
|[org.apache.pulsar.broker.transaction.TransactionConsumeTest](#r0s37)|2:white_check_mark:|||30s|
|[org.apache.pulsar.broker.web.RestExceptionTest](#r0s38)|3:white_check_mark:|||37ms|
|[org.apache.pulsar.broker.web.WebServiceTest](#r0s39)|9:white_check_mark:|||27s|
|[org.apache.pulsar.client.impl.AdminApiKeyStoreTlsAuthTest](#r0s40)|4:white_check_mark:|||8s|
|[org.apache.pulsar.client.impl.BatchMessageIdImplSerializationTest](#r0s41)|4:white_check_mark:|||30ms|
|[org.apache.pulsar.client.impl.BatchMessageIndexAckDisableTest](#r0s42)|4:white_check_mark:|||14s|
|[org.apache.pulsar.client.impl.BatchMessageIndexAckTest](#r0s43)|5:white_check_mark:|||44s|
|[org.apache.pulsar.client.impl.BrokerClientIntegrationTest](#r0s44)|15:white_check_mark:|||148s|
|[org.apache.pulsar.client.impl.CompactedOutBatchMessageTest](#r0s45)|1:white_check_mark:|||1s|
|[org.apache.pulsar.client.impl.ConsumerAckResponseTest](#r0s46)|1:white_check_mark:|||549ms|
|[org.apache.pulsar.client.impl.ConsumerConfigurationTest](#r0s47)|4:white_check_mark:|||12s|
|[org.apache.pulsar.client.impl.ConsumerDedupPermitsUpdate](#r0s48)|7:white_check_mark:|||4s|
|[org.apache.pulsar.client.impl.ConsumerUnsubscribeTest](#r0s49)|1:white_check_mark:|||129ms|
|[org.apache.pulsar.client.impl.KeyStoreTlsProducerConsumerTestWithAuth](#r0s50)|3:white_check_mark:|||23s|
|[org.apache.pulsar.client.impl.KeyStoreTlsProducerConsumerTestWithoutAuth](#r0s51)|3:white_check_mark:|||8s|
|[org.apache.pulsar.client.impl.KeyStoreTlsTest](#r0s52)|1:white_check_mark:|||183ms|
|[org.apache.pulsar.client.impl.MessageChecksumTest](#r0s53)|3:white_check_mark:|||47s|
|[org.apache.pulsar.client.impl.MessageChunkingTest](#r0s54)|8:white_check_mark:||1:warning:|73s|
|[org.apache.pulsar.client.impl.MessageParserTest](#r0s55)|2:white_check_mark:|||5s|
|[org.apache.pulsar.client.impl.MultiTopicsReaderTest](#r0s56)|8:white_check_mark:|||35s|
|[org.apache.pulsar.client.impl.NegativeAcksTest](#r0s57)|32:white_check_mark:|||11s|
|[org.apache.pulsar.client.impl.PatternTopicsConsumerImplTest](#r0s58)|11:white_check_mark:|||63s|
|[org.apache.pulsar.client.impl.PerMessageUnAcknowledgedRedeliveryTest](#r0s59)|5:white_check_mark:|||34s|
|[org.apache.pulsar.client.impl.PulsarMultiHostClientTest](#r0s60)|3:white_check_mark:|||15s|
|[org.apache.pulsar.client.impl.RawMessageSerDeserTest](#r0s61)|1:white_check_mark:|||10ms|
|[org.apache.pulsar.client.impl.SchemaDeleteTest](#r0s62)|1:white_check_mark:|||2s|
|[org.apache.pulsar.client.impl.SequenceIdWithErrorTest](#r0s63)|3:white_check_mark:||2:warning:|18s|
|[org.apache.pulsar.client.impl.TopicDoesNotExistsTest](#r0s64)|2:white_check_mark:|||4s|
|[org.apache.pulsar.client.impl.TopicFromMessageTest](#r0s65)|5:white_check_mark:|||14s|
|[org.apache.pulsar.client.impl.TopicsConsumerImplTest](#r0s66)|17:white_check_mark:|||133s|
|[org.apache.pulsar.client.impl.UnAcknowledgedMessagesTimeoutTest](#r0s67)|7:white_check_mark:|||44s|
|[org.apache.pulsar.client.impl.ZeroQueueSizeTest](#r0s68)|14:white_check_mark:|||16s|
|[org.apache.pulsar.common.api.raw.RawMessageImplTest](#r0s69)|1:white_check_mark:|||316ms|
|[org.apache.pulsar.common.compression.CommandsTest](#r0s70)|1:white_check_mark:|||30ms|
|[org.apache.pulsar.common.compression.CompressorCodecBackwardCompatTest](#r0s71)|6:white_check_mark:|||223ms|
|[org.apache.pulsar.common.compression.CompressorCodecTest](#r0s72)|45:white_check_mark:|||737ms|
|[org.apache.pulsar.common.compression.Crc32cChecksumTest](#r0s73)|6:white_check_mark:|||5s|
|[org.apache.pulsar.common.lookup.data.LookupDataTest](#r0s74)|4:white_check_mark:|||2s|
|[org.apache.pulsar.common.naming.MetadataTests](#r0s75)|2:white_check_mark:|||161ms|
|[org.apache.pulsar.common.naming.NamespaceBundlesTest](#r0s76)|5:white_check_mark:|||99ms|
|[org.apache.pulsar.common.naming.NamespaceBundleTest](#r0s77)|6:white_check_mark:|||64ms|
|[org.apache.pulsar.common.naming.NamespaceNameTest](#r0s78)|2:white_check_mark:|||207ms|
|[org.apache.pulsar.common.naming.ServiceConfigurationTest](#r0s79)|4:white_check_mark:|||48ms|
|[org.apache.pulsar.common.naming.TopicNameTest](#r0s80)|4:white_check_mark:|||529ms|
|[org.apache.pulsar.common.net.ServiceURITest](#r0s81)|21:white_check_mark:|||237ms|
|[org.apache.pulsar.common.policies.data.AutoFailoverPolicyDataTest](#r0s82)|1:white_check_mark:|||15ms|
|[org.apache.pulsar.common.policies.data.AutoFailoverPolicyTypeTest](#r0s83)|1:white_check_mark:|||19ms|
|[org.apache.pulsar.common.policies.data.AutoTopicCreationOverrideTest](#r0s84)|6:white_check_mark:|||64ms|
|[org.apache.pulsar.common.policies.data.BacklogQuotaTest](#r0s85)|1:white_check_mark:|||12ms|
|[org.apache.pulsar.common.policies.data.ClusterDataTest](#r0s86)|1:white_check_mark:|||9ms|
|[org.apache.pulsar.common.policies.data.ConsumerStatsTest](#r0s87)|1:white_check_mark:|||8ms|
|[org.apache.pulsar.common.policies.data.EnsemblePlacementPolicyConfigTest](#r0s88)|2:white_check_mark:|||948ms|
|[org.apache.pulsar.common.policies.data.LocalPolicesTest](#r0s89)|1:white_check_mark:|||48ms|
|[org.apache.pulsar.common.policies.data.NamespaceIsolationDataTest](#r0s90)|1:white_check_mark:|||76ms|
|[org.apache.pulsar.common.policies.data.NamespaceOwnershipStatusTest](#r0s91)|1:white_check_mark:|||45ms|
|[org.apache.pulsar.common.policies.data.OffloadPoliciesTest](#r0s92)|6:white_check_mark:|||216ms|
|[org.apache.pulsar.common.policies.data.PartitionedTopicStatsTest](#r0s93)|1:white_check_mark:|||12ms|
|[org.apache.pulsar.common.policies.data.PersistencePoliciesTest](#r0s94)|1:white_check_mark:|||19ms|
|[org.apache.pulsar.common.policies.data.PersistentOfflineTopicStatsTest](#r0s95)|1:white_check_mark:|||29ms|
|[org.apache.pulsar.common.policies.data.PersistentTopicStatsTest](#r0s96)|2:white_check_mark:|||51ms|
|[org.apache.pulsar.common.policies.data.PoliciesDataTest](#r0s97)|4:white_check_mark:|||1s|
|[org.apache.pulsar.common.policies.data.PublisherStatsTest](#r0s98)|2:white_check_mark:|||37ms|
|[org.apache.pulsar.common.policies.data.ReplicatorStatsTest](#r0s99)|2:white_check_mark:|||30ms|
|[org.apache.pulsar.common.policies.data.ResourceQuotaTest](#r0s100)|2:white_check_mark:|||45ms|
|[org.apache.pulsar.common.policies.data.RetentionPolicesTest](#r0s101)|1:white_check_mark:|||8ms|
|[org.apache.pulsar.common.policies.impl.AutoFailoverPolicyFactoryTest](#r0s102)|1:white_check_mark:|||22ms|
|[org.apache.pulsar.common.policies.impl.MinAvailablePolicyTest](#r0s103)|1:white_check_mark:|||1ms|
|[org.apache.pulsar.common.policies.impl.NamespaceIsolationPoliciesTest](#r0s104)|7:white_check_mark:|||265ms|
|[org.apache.pulsar.common.policies.impl.NamespaceIsolationPolicyImplTest](#r0s105)|7:white_check_mark:|||309ms|
|[org.apache.pulsar.common.protocol.ByteBufPairTest](#r0s106)|2:white_check_mark:|||5s|
|[org.apache.pulsar.common.protocol.CommandUtilsTests](#r0s107)|7:white_check_mark:|||3s|
|[org.apache.pulsar.common.protocol.MarkersTest](#r0s108)|6:white_check_mark:|||3s|
|[org.apache.pulsar.common.protocol.PulsarDecoderTest](#r0s109)|1:white_check_mark:|||4s|
|[org.apache.pulsar.common.stats.JvmDefaultGCMetricsLoggerTest](#r0s110)|1:white_check_mark:|||82ms|
|[org.apache.pulsar.common.util.collections.BitSetRecyclableRecyclableTest](#r0s111)|2:white_check_mark:|||13ms|
|[org.apache.pulsar.common.util.collections.ConcurrentBitSetRecyclableTest](#r0s112)|2:white_check_mark:|||63ms|
|[org.apache.pulsar.common.util.collections.ConcurrentLongHashMapTest](#r0s113)|13:white_check_mark:|||28s|
|[org.apache.pulsar.common.util.collections.ConcurrentLongPairSetTest](#r0s114)|15:white_check_mark:|||2s|
|[org.apache.pulsar.common.util.collections.ConcurrentOpenHashMapTest](#r0s115)|12:white_check_mark:|||9s|
|[org.apache.pulsar.common.util.collections.ConcurrentOpenHashSetTest](#r0s116)|11:white_check_mark:|||7s|
|[org.apache.pulsar.common.util.collections.ConcurrentOpenLongPairRangeSetTest](#r0s117)|13:white_check_mark:|||1s|
|[org.apache.pulsar.common.util.collections.ConcurrentSortedLongPairSetTest](#r0s118)|9:white_check_mark:|||342ms|
|[org.apache.pulsar.common.util.collections.FieldParserTest](#r0s119)|2:white_check_mark:|||64ms|
|[org.apache.pulsar.common.util.collections.GrowableArrayBlockingQueueTest](#r0s120)|6:white_check_mark:|||350ms|
|[org.apache.pulsar.common.util.collections.GrowablePriorityLongPairQueueTest](#r0s121)|15:white_check_mark:|||3s|
|[org.apache.pulsar.common.util.collections.TripleLongPriorityQueueTest](#r0s122)|3:white_check_mark:|||238ms|
|[org.apache.pulsar.common.util.FieldParserTest](#r0s123)|1:white_check_mark:|||242ms|
|[org.apache.pulsar.common.util.FileModifiedTimeUpdaterTest](#r0s124)|6:white_check_mark:|||6s|
|[org.apache.pulsar.common.util.netty.ChannelFuturesTest](#r0s125)|5:white_check_mark:|||2s|
|[org.apache.pulsar.common.util.RateLimiterTest](#r0s126)|11:white_check_mark:|||7s|
|[org.apache.pulsar.common.util.ReflectionsTest](#r0s127)|12:white_check_mark:|||172ms|
|[org.apache.pulsar.common.util.RelativeTimeUtilTest](#r0s128)|1:white_check_mark:|||39ms|
|[org.apache.pulsar.discovery.service.web.DiscoveryServiceWebTest](#r0s129)|1:white_check_mark:|||5s|
|[org.apache.pulsar.functions.worker.PulsarFunctionE2ESecurityTest](#r0s130)|2:white_check_mark:|||28s|
|[org.apache.pulsar.functions.worker.PulsarFunctionPublishTest](#r0s131)|3:white_check_mark:|||42s|
|[org.apache.pulsar.functions.worker.PulsarFunctionTlsTest](#r0s132)|1:white_check_mark:|||12s|
|[org.apache.pulsar.io.PulsarFunctionTlsTest](#r0s133)|1:white_check_mark:|||30s|
|[org.apache.pulsar.proxy.server.AdminProxyHandlerTest](#r0s134)|1:white_check_mark:|||474ms|
|[org.apache.pulsar.proxy.server.AuthedAdminProxyHandlerTest](#r0s135)|1:white_check_mark:|||2s|
|[org.apache.pulsar.proxy.server.FunctionWorkerRoutingTest](#r0s136)|1:white_check_mark:|||10ms|
|[org.apache.pulsar.proxy.server.ProxyAdditionalServletTest](#r0s137)|1:white_check_mark:|||125ms|
|[org.apache.pulsar.proxy.server.ProxyAuthenticatedProducerConsumerTest](#r0s138)|1:white_check_mark:|||2s|
|[org.apache.pulsar.proxy.server.ProxyAuthenticationTest](#r0s139)|1:white_check_mark:|||17s|
|[org.apache.pulsar.proxy.server.ProxyConnectionThrottlingTest](#r0s140)|1:white_check_mark:|||2s|
|[org.apache.pulsar.proxy.server.ProxyEnableHAProxyProtocolTest](#r0s141)|1:white_check_mark:|||511ms|
|[org.apache.pulsar.proxy.server.ProxyForwardAuthDataTest](#r0s142)|1:white_check_mark:|||32s|
|[org.apache.pulsar.proxy.server.ProxyIsAHttpProxyTest](#r0s143)|10:white_check_mark:|||2s|
|[org.apache.pulsar.proxy.server.ProxyKeyStoreTlsTestWithAuth](#r0s144)|3:white_check_mark:|||7s|
|[org.apache.pulsar.proxy.server.ProxyKeyStoreTlsTestWithoutAuth](#r0s145)|3:white_check_mark:|||7s|
|[org.apache.pulsar.proxy.server.ProxyLookupThrottlingTest](#r0s146)|1:white_check_mark:|||3s|
|[org.apache.pulsar.proxy.server.ProxyParserTest](#r0s147)|5:white_check_mark:|||1s|
|[org.apache.pulsar.proxy.server.ProxyRolesEnforcementTest](#r0s148)|1:white_check_mark:|||10s|
|[org.apache.pulsar.proxy.server.ProxyStatsTest](#r0s149)|3:white_check_mark:|||533ms|
|[org.apache.pulsar.proxy.server.ProxyTest](#r0s150)|6:white_check_mark:|||3s|
|[org.apache.pulsar.proxy.server.ProxyTlsTest](#r0s151)|2:white_check_mark:|||414ms|
|[org.apache.pulsar.proxy.server.ProxyTlsTestWithAuth](#r0s152)|1:white_check_mark:|||4ms|
|[org.apache.pulsar.proxy.server.ProxyWithAuthorizationNegTest](#r0s153)|1:white_check_mark:|||2s|
|[org.apache.pulsar.proxy.server.ProxyWithAuthorizationTest](#r0s154)|13:white_check_mark:|||33s|
|[org.apache.pulsar.proxy.server.ProxyWithoutServiceDiscoveryTest](#r0s155)|1:white_check_mark:|||2s|
|[org.apache.pulsar.proxy.server.SuperUserAuthedAdminProxyHandlerTest](#r0s156)|3:white_check_mark:|||8s|
|[org.apache.pulsar.proxy.server.UnauthedAdminProxyHandlerTest](#r0s157)|2:white_check_mark:|||114ms|
|[org.apache.pulsar.PulsarBrokerStarterTest](#r0s158)|9:white_check_mark:|||591ms|
|[org.apache.pulsar.schema.compatibility.SchemaCompatibilityCheckTest](#r0s159)|23:white_check_mark:|||107s|
|[org.apache.pulsar.schema.PartitionedTopicSchemaTest](#r0s160)|1:white_check_mark:|||29s|
|[org.apache.pulsar.schema.SchemaTest](#r0s161)|3:white_check_mark:|||31s|
|[org.apache.pulsar.stats.client.PulsarBrokerStatsClientTest](#r0s162)|2:white_check_mark:|||41s|
|[org.apache.pulsar.tests.EnumValuesDataProviderTest](#r0s163)|6:white_check_mark:|||23ms|
|[org.apache.pulsar.tests.TestRetrySupportBeforeMethodRetryTest](#r0s164)|1:white_check_mark:||4:warning:|36ms|
|[org.apache.pulsar.tests.TestRetrySupportRetryTest](#r0s165)|1:white_check_mark:||4:warning:|27ms|
|[org.apache.pulsar.tests.TestRetrySupportSuccessTest](#r0s166)|3:white_check_mark:|||1ms|
|[org.apache.pulsar.tests.ThreadDumpUtilTest](#r0s167)|2:white_check_mark:|||17ms|
|[org.apache.pulsar.utils.SimpleTextOutputStreamTest](#r0s168)|4:white_check_mark:|||50ms|
|[org.apache.pulsar.utils.StatsOutputStreamTest](#r0s169)|6:white_check_mark:|||59ms|
|[org.apache.pulsar.websocket.proxy.ProxyAuthenticationTest](#r0s170)|4:white_check_mark:|||29s|
|[org.apache.pulsar.websocket.proxy.ProxyAuthorizationTest](#r0s171)|1:white_check_mark:|||1s|
|[org.apache.pulsar.websocket.proxy.ProxyConfigurationTest](#r0s172)|2:white_check_mark:|||9s|
|[org.apache.pulsar.websocket.proxy.ProxyPublishConsumeTlsTest](#r0s173)|1:white_check_mark:|||11s|
|[org.apache.pulsar.websocket.proxy.ProxyPublishConsumeWithoutZKTest](#r0s174)|1:white_check_mark:|||7s|
|[org.apache.pulsar.websocket.proxy.v1.V1_ProxyAuthenticationTest](#r0s175)|4:white_check_mark:|||30s|
### :x: <a id="user-content-r0s0" href="#r0s0">org.apache.pulsar.AddMissingPatchVersionTest</a>
```
:warning: testVersionStrings
:x: testVersionStrings
	java.lang.AssertionError: expected [1.2.1] but found [1.2.0]
```
### :white_check_mark: <a id="user-content-r0s1" href="#r0s1">org.apache.pulsar.broker.admin.AdminApiOffloadTest</a>
```
:white_check_mark: testOffloadPoliciesAppliedApi
:white_check_mark: testOffloadV2
:white_check_mark: testTopicLevelOffloadNonPartitioned
:white_check_mark: testTopicLevelOffloadPartitioned
:white_check_mark: testOffloadV1
:white_check_mark: testOffloadPolicies
:white_check_mark: testOffloadPoliciesApi
```
### :white_check_mark: <a id="user-content-r0s2" href="#r0s2">org.apache.pulsar.broker.auth.AuthenticationServiceTest</a>
```
:white_check_mark: testAuthentication
:white_check_mark: testAuthenticationHttp
```
### :white_check_mark: <a id="user-content-r0s3" href="#r0s3">org.apache.pulsar.broker.auth.AuthLogsTest</a>
```
:white_check_mark: httpEndpoint
:white_check_mark: binaryEndpoint
```
### :white_check_mark: <a id="user-content-r0s4" href="#r0s4">org.apache.pulsar.broker.auth.AuthorizationTest</a>
```
:white_check_mark: simple
```
### :white_check_mark: <a id="user-content-r0s5" href="#r0s5">org.apache.pulsar.broker.lookup.http.HttpTopicLookupv2Test</a>
```
:white_check_mark: crossColoLookup
:white_check_mark: testNotEnoughLookupPermits
:white_check_mark: testValidateReplicationSettingsOnNamespace
:white_check_mark: testDataPojo
```
### :white_check_mark: <a id="user-content-r0s6" href="#r0s6">org.apache.pulsar.broker.namespace.NamespaceCreateBundlesTest</a>
```
:white_check_mark: testCreateNamespaceWithDefaultBundles
:white_check_mark: testSplitBundleUpdatesLocalPoliciesWithoutOverwriting
```
### :white_check_mark: <a id="user-content-r0s7" href="#r0s7">org.apache.pulsar.broker.namespace.NamespaceOwnershipListenerTests</a>
```
:white_check_mark: testGetAllPartitions
:white_check_mark: testNamespaceBundleOwnershipListener
```
### :white_check_mark: <a id="user-content-r0s8" href="#r0s8">org.apache.pulsar.broker.namespace.NamespaceServiceTest</a>
```
:white_check_mark: testSplitMapWithRefreshedStatMap
:white_check_mark: testRemoveOwnershipNamespaceBundle
:white_check_mark: testIsServiceUnitDisabled
:white_check_mark: testLoadReportDeserialize
:white_check_mark: testCreateLookupResult
:white_check_mark: testUnloadNamespaceBundleWithStuckTopic
:white_check_mark: testUnloadNamespaceBundleFailure
:white_check_mark: testSplitAndOwnBundles
:white_check_mark: testCreateNamespaceWithDefaultNumberOfBundles
:white_check_mark: testRemoveOwnershipAndSplitBundle
```
### :white_check_mark: <a id="user-content-r0s9" href="#r0s9">org.apache.pulsar.broker.namespace.NamespaceUnloadingTest</a>
```
:white_check_mark: testUnloadNotLoadedNamespace
:white_check_mark: testUnloadPartiallyLoadedNamespace
```
### :white_check_mark: <a id="user-content-r0s10" href="#r0s10">org.apache.pulsar.broker.namespace.OwnerShipCacheForCurrentServerTest</a>
```
:white_check_mark: testOwnershipForCurrentServer
```
### :white_check_mark: <a id="user-content-r0s11" href="#r0s11">org.apache.pulsar.broker.namespace.OwnershipCacheTest</a>
```
:white_check_mark: testGetOwnedServiceUnits
:white_check_mark: testRemoveOwnership
:white_check_mark: testGetOwnedServiceUnit
:white_check_mark: testGetOrSetOwner
:white_check_mark: testConstructor
:white_check_mark: testGetOwner
:white_check_mark: testDisableOwnership
:white_check_mark: testReestablishOwnership
```
### :white_check_mark: <a id="user-content-r0s12" href="#r0s12">org.apache.pulsar.broker.protocol.ProtocolHandlersTest</a>
```
:white_check_mark: testStart
:white_check_mark: testGetProtocol
:white_check_mark: testNewChannelInitializersSuccess
:white_check_mark: testInitialize
:white_check_mark: testNewChannelInitializersOverlapped
:white_check_mark: testGetProtocolDataToAdvertise
```
### :white_check_mark: <a id="user-content-r0s13" href="#r0s13">org.apache.pulsar.broker.protocol.ProtocolHandlerUtilsTest</a>
```
:white_check_mark: testLoadProtocolHandler
:white_check_mark: testLoadProtocolHandlerBlankHandlerClass
:white_check_mark: testLoadProtocolHandlerWrongHandlerClass
```
### :white_check_mark: <a id="user-content-r0s14" href="#r0s14">org.apache.pulsar.broker.protocol.ProtocolHandlerWithClassLoaderTest</a>
```
:white_check_mark: testWrapper
```
### :white_check_mark: <a id="user-content-r0s15" href="#r0s15">org.apache.pulsar.broker.PulsarServiceTest</a>
```
:white_check_mark: testGetWorkerService
:white_check_mark: testGetWorkerServiceException
```
### :white_check_mark: <a id="user-content-r0s16" href="#r0s16">org.apache.pulsar.broker.service.MessagePublishBufferThrottleTest</a>
```
:white_check_mark: testMessagePublishBufferThrottleEnable
:white_check_mark: testBlockByPublishRateLimiting
:white_check_mark: testMessagePublishBufferThrottleDisabled
```
### :white_check_mark: <a id="user-content-r0s17" href="#r0s17">org.apache.pulsar.broker.service.ReplicatorTest</a>
```
:white_check_mark: testResumptionAfterBacklogRelaxed
:white_check_mark: testReplicationOverrides
:white_check_mark: testResetCursorNotFail
:white_check_mark: testUpdateGlobalTopicPartition
:white_check_mark: testReplication
:white_check_mark: testReplicatorOnPartitionedTopic
:white_check_mark: testConcurrentReplicator
:white_check_mark: testTopicReplicatedAndProducerCreate
:white_check_mark: testDeleteReplicatorFailure
:white_check_mark: testReplicatorOnPartitionedTopic
:white_check_mark: testReplicationForBatchMessages
:white_check_mark: testReplicatorClearBacklog
:white_check_mark: verifyChecksumAfterReplication
:white_check_mark: testCloseReplicatorStartProducer
:white_check_mark: activeBrokerParse
:white_check_mark: testReplicatePeekAndSkip
:white_check_mark: testReplication
:white_check_mark: testReplicatedCluster
:white_check_mark: testTopicReplicatedAndProducerCreate
:white_check_mark: testConfigChange
:white_check_mark: testFailures
:white_check_mark: testReplicatorProducerClosing
```
### :white_check_mark: <a id="user-content-r0s18" href="#r0s18">org.apache.pulsar.broker.service.TopicOwnerTest</a>
```
:white_check_mark: testReleaseOwnershipWithZookeeperDisconnectedBeforeOwnershipNodeDeleted
:white_check_mark: testAcquireOwnershipWithZookeeperDisconnectedAfterOwnershipNodeCreated
:white_check_mark: testConnectToInvalidateBundleCacheBroker
:white_check_mark: testAcquireOwnershipWithZookeeperDisconnectedBeforeOwnershipNodeCreated
:white_check_mark: testLookupPartitionedTopic
:white_check_mark: testListNonPersistentTopic
:white_check_mark: testReleaseOwnershipWithZookeeperDisconnectedAfterOwnershipNodeDeleted
:white_check_mark: testReestablishOwnershipAfterInvalidateCache
```
### :white_check_mark: <a id="user-content-r0s19" href="#r0s19">org.apache.pulsar.broker.SLAMonitoringTest</a>
```
:white_check_mark: testOwnedNamespaces
:white_check_mark: testOwnershipAfterSetup
:white_check_mark: testUnloadIfBrokerCrashes
:white_check_mark: testOwnershipViaAdminAfterSetup
```
### :white_check_mark: <a id="user-content-r0s20" href="#r0s20">org.apache.pulsar.broker.stats.BookieClientsStatsGeneratorTest</a>
```
:white_check_mark: testJvmDirectMemoryUsedMetric
:white_check_mark: testBookieClientStatsGenerator
```
### :white_check_mark: <a id="user-content-r0s21" href="#r0s21">org.apache.pulsar.broker.stats.ConsumerStatsTest</a>
```
:white_check_mark: testAckStatsOnPartitionedTopicForExclusiveSubscription
:white_check_mark: testConsumerStatsOnZeroMaxUnackedMessagesPerConsumer
:white_check_mark: testUpdateStatsForActiveConsumerAndSubscription
```
### :white_check_mark: <a id="user-content-r0s22" href="#r0s22">org.apache.pulsar.broker.stats.ManagedCursorMetricsTest</a>
```
:white_check_mark: testManagedCursorMetrics
```
### :white_check_mark: <a id="user-content-r0s23" href="#r0s23">org.apache.pulsar.broker.stats.ManagedLedgerMetricsTest</a>
```
:white_check_mark: testManagedLedgerMetrics
```
### :white_check_mark: <a id="user-content-r0s24" href="#r0s24">org.apache.pulsar.broker.stats.prometheus.AggregatedNamespaceStatsTest</a>
```
:white_check_mark: testSimpleAggregation
```
### :white_check_mark: <a id="user-content-r0s25" href="#r0s25">org.apache.pulsar.broker.stats.PrometheusMetricsTest</a>
```
:white_check_mark: testPerTopicStats
:white_check_mark: testAuthMetrics
:white_check_mark: testPerTopicExpiredStat
:white_check_mark: testPerProducerStats
:white_check_mark: testMetricsTopicCount
:white_check_mark: testManagedLedgerBookieClientStats
:white_check_mark: testDuplicateMetricTypeDefinitions
:white_check_mark: testExpiringTokenMetrics
:white_check_mark: testPerConsumerStats
:white_check_mark: testPerNamespaceStats
:white_check_mark: testManagedCursorPersistStats
:white_check_mark: testDuplicateMetricTypeDefinitions
:white_check_mark: testExpiredTokenMetrics
:white_check_mark: testManagedLedgerCacheStats
:white_check_mark: testManagedLedgerStats
```
### :white_check_mark: <a id="user-content-r0s26" href="#r0s26">org.apache.pulsar.broker.stats.SubscriptionStatsTest</a>
```
:white_check_mark: testConsumersAfterMarkDelete
:white_check_mark: testNonContiguousDeletedMessagesRanges
```
### :white_check_mark: <a id="user-content-r0s27" href="#r0s27">org.apache.pulsar.broker.systopic.NamespaceEventsSystemTopicServiceTest</a>
```
:white_check_mark: testSendAndReceiveNamespaceEvents
```
### :white_check_mark: <a id="user-content-r0s28" href="#r0s28">org.apache.pulsar.broker.transaction.buffer.InMemTransactionBufferReaderTest</a>
```
:white_check_mark: testCloseReleaseAllEntries
:white_check_mark: testInvalidNumEntriesArgument
:white_check_mark: testEndOfTransactionException
```
### :white_check_mark: <a id="user-content-r0s29" href="#r0s29">org.apache.pulsar.broker.transaction.buffer.TransactionBufferClientTest</a>
```
:white_check_mark: testAbortOnTopic
:white_check_mark: testAbortOnSubscription
:white_check_mark: testCommitOnTopic
:white_check_mark: testCommitOnSubscription
```
### :white_check_mark: <a id="user-content-r0s30" href="#r0s30">org.apache.pulsar.broker.transaction.buffer.TransactionBufferTest</a>
```
:white_check_mark: testOpenReaderOnNonExistentTxn
:white_check_mark: testAbortCommittedTxn
:white_check_mark: testAbortTxn
:white_check_mark: testAbortNonExistentTxn
:white_check_mark: testCommitNonExistentTxn
:white_check_mark: testCommitTxn
:white_check_mark: testOpenReaderOnAnOpenTxn
```
### :white_check_mark: <a id="user-content-r0s31" href="#r0s31">org.apache.pulsar.broker.transaction.buffer.TransactionEntryImplTest</a>
```
:white_check_mark: testCloseShouldReleaseBuffer
```
### :white_check_mark: <a id="user-content-r0s32" href="#r0s32">org.apache.pulsar.broker.transaction.buffer.TransactionLowWaterMarkTest</a>
```
:white_check_mark: testTransactionBufferLowWaterMark
:white_check_mark: testPendingAckLowWaterMark
```
### :white_check_mark: <a id="user-content-r0s33" href="#r0s33">org.apache.pulsar.broker.transaction.buffer.TransactionStablePositionTest</a>
```
:white_check_mark: commitTxnTest
:white_check_mark: abortTxnTest
:warning: commitTxnTest
```
### :white_check_mark: <a id="user-content-r0s34" href="#r0s34">org.apache.pulsar.broker.transaction.coordinator.TransactionCoordinatorClientTest</a>
```
:white_check_mark: testClientStart
:white_check_mark: testCommitAndAbort
:white_check_mark: testNewTxn
```
### :white_check_mark: <a id="user-content-r0s35" href="#r0s35">org.apache.pulsar.broker.transaction.coordinator.TransactionMetaStoreAssignmentTest</a>
```
:white_check_mark: testTransactionMetaStoreAssignAndFailover
```
### :white_check_mark: <a id="user-content-r0s36" href="#r0s36">org.apache.pulsar.broker.transaction.pendingack.PendingAckInMemoryDeleteTest</a>
```
:warning: txnAckTestNoBatchAndSharedSubMemoryDeleteTest
:white_check_mark: txnAckTestNoBatchAndSharedSubMemoryDeleteTest
:white_check_mark: txnAckTestBatchAndSharedSubMemoryDeleteTest
```
### :white_check_mark: <a id="user-content-r0s37" href="#r0s37">org.apache.pulsar.broker.transaction.TransactionConsumeTest</a>
```
:white_check_mark: noSortedTest
:white_check_mark: sortedTest
```
### :white_check_mark: <a id="user-content-r0s38" href="#r0s38">org.apache.pulsar.broker.web.RestExceptionTest</a>
```
:white_check_mark: testRestException
:white_check_mark: testWebApplicationException
:white_check_mark: testOtherException
```
### :white_check_mark: <a id="user-content-r0s39" href="#r0s39">org.apache.pulsar.broker.web.WebServiceTest</a>
```
:white_check_mark: testTlsAuthDisallowInsecure
:white_check_mark: testBrokerReady
:white_check_mark: testDefaultClientVersion
:white_check_mark: testTlsEnabled
:white_check_mark: testTlsAuthAllowInsecure
:white_check_mark: testSplitPath
:white_check_mark: testMaxRequestSize
:white_check_mark: testTlsDisabled
:white_check_mark: testRateLimiting
```
### :white_check_mark: <a id="user-content-r0s40" href="#r0s40">org.apache.pulsar.client.impl.AdminApiKeyStoreTlsAuthTest</a>
```
:white_check_mark: testAuthorizedUserAsOriginalPrincipal
:white_check_mark: testSuperUserCantListNamespaces
:white_check_mark: testPersistentList
:white_check_mark: testSuperUserCanListTenants
```
### :white_check_mark: <a id="user-content-r0s41" href="#r0s41">org.apache.pulsar.client.impl.BatchMessageIdImplSerializationTest</a>
```
:white_check_mark: testSerializationEmpty
:white_check_mark: testSerialization1
:white_check_mark: testSerializationNull
:white_check_mark: testSerialization2
```
### :white_check_mark: <a id="user-content-r0s42" href="#r0s42">org.apache.pulsar.client.impl.BatchMessageIndexAckDisableTest</a>
```
:white_check_mark: testBatchMessageIndexAckForExclusiveSubscription
:white_check_mark: testBatchMessageIndexAckForSharedSubscription
:white_check_mark: testBatchMessageIndexAckForExclusiveSubscription
:white_check_mark: testBatchMessageIndexAckForSharedSubscription
```
### :white_check_mark: <a id="user-content-r0s43" href="#r0s43">org.apache.pulsar.client.impl.BatchMessageIndexAckTest</a>
```
:white_check_mark: testBatchMessageIndexAckForSharedSubscription
:white_check_mark: testBatchMessageIndexAckForSharedSubscription
:white_check_mark: testDoNotRecycleAckSetMultipleTimes
:white_check_mark: testBatchMessageIndexAckForExclusiveSubscription
:white_check_mark: testBatchMessageIndexAckForExclusiveSubscription
```
### :white_check_mark: <a id="user-content-r0s44" href="#r0s44">org.apache.pulsar.client.impl.BrokerClientIntegrationTest</a>
```
:white_check_mark: testDisconnectClientWithoutClosingConnection
:white_check_mark: testResetCursor
:white_check_mark: testResetCursor
:white_check_mark: testCloseBrokerService
:white_check_mark: testUnsupportedBatchMessageConsumer
:white_check_mark: testAvroSchemaProducerConsumerWithSpecifiedReaderAndWriter
:white_check_mark: testJsonSchemaProducerConsumerWithSpecifiedReaderAndWriter
:white_check_mark: testOperationTimeout
:white_check_mark: testCleanProducer
:white_check_mark: testUnsupportedBatchMessageConsumer
:white_check_mark: testCloseConnectionOnBrokerRejectedRequest
:white_check_mark: testAddEntryOperationTimeout
:white_check_mark: testInvalidDynamicConfiguration
:white_check_mark: testMaxConcurrentTopicLoading
:white_check_mark: testCloseConnectionOnInternalServerError
```
### :white_check_mark: <a id="user-content-r0s45" href="#r0s45">org.apache.pulsar.client.impl.CompactedOutBatchMessageTest</a>
```
:white_check_mark: testCompactedOutMessages
```
### :white_check_mark: <a id="user-content-r0s46" href="#r0s46">org.apache.pulsar.client.impl.ConsumerAckResponseTest</a>
```
:white_check_mark: testAckResponse
```
### :white_check_mark: <a id="user-content-r0s47" href="#r0s47">org.apache.pulsar.client.impl.ConsumerConfigurationTest</a>
```
:white_check_mark: testReadCompactNonPersistentExclusive
:white_check_mark: testReadCompactPersistentExclusive
:white_check_mark: testReadCompactPersistentFailover
:white_check_mark: testReadCompactPersistentShared
```
### :white_check_mark: <a id="user-content-r0s48" href="#r0s48">org.apache.pulsar.client.impl.ConsumerDedupPermitsUpdate</a>
```
:white_check_mark: testConsumerDedup
:white_check_mark: testConsumerDedup
:white_check_mark: testConsumerDedup
:white_check_mark: testConsumerDedup
:white_check_mark: testConsumerDedup
:white_check_mark: testConsumerDedup
:white_check_mark: testConsumerDedup
```
### :white_check_mark: <a id="user-content-r0s49" href="#r0s49">org.apache.pulsar.client.impl.ConsumerUnsubscribeTest</a>
```
:white_check_mark: testConsumerUnsubscribeReference
```
### :white_check_mark: <a id="user-content-r0s50" href="#r0s50">org.apache.pulsar.client.impl.KeyStoreTlsProducerConsumerTestWithAuth</a>
```
:white_check_mark: testTlsClientAuthOverHTTPProtocol
:white_check_mark: testTlsClientAuthOverBinaryProtocol
:white_check_mark: testTlsLargeSizeMessage
```
### :white_check_mark: <a id="user-content-r0s51" href="#r0s51">org.apache.pulsar.client.impl.KeyStoreTlsProducerConsumerTestWithoutAuth</a>
```
:white_check_mark: testTlsClientAuthOverHTTPProtocol
:white_check_mark: testTlsClientAuthOverBinaryProtocol
:white_check_mark: testTlsLargeSizeMessage
```
### :white_check_mark: <a id="user-content-r0s52" href="#r0s52">org.apache.pulsar.client.impl.KeyStoreTlsTest</a>
```
:white_check_mark: testValidate
```
### :white_check_mark: <a id="user-content-r0s53" href="#r0s53">org.apache.pulsar.client.impl.MessageChecksumTest</a>
```
:white_check_mark: testChecksumCompatibilityInMixedVersionBrokerCluster
:white_check_mark: testTamperingMessageIsDetected
:white_check_mark: testChecksumCompatibilityInMixedVersionBrokerCluster
```
### :white_check_mark: <a id="user-content-r0s54" href="#r0s54">org.apache.pulsar.client.impl.MessageChunkingTest</a>
```
:white_check_mark: testPublishWithFailure
:white_check_mark: testInvalidUseCaseForChunking
:white_check_mark: testLargeMessage
:white_check_mark: testExpireIncompleteChunkMessage
:white_check_mark: testInvalidConfig
:white_check_mark: testLargeMessageAckTimeOut
:white_check_mark: testLargeMessageAckTimeOut
:white_check_mark: testLargeMessage
:warning: testMaxPendingChunkMessages
```
### :white_check_mark: <a id="user-content-r0s55" href="#r0s55">org.apache.pulsar.client.impl.MessageParserTest</a>
```
:white_check_mark: testWithoutBatches
:white_check_mark: testWithBatches
```
### :white_check_mark: <a id="user-content-r0s56" href="#r0s56">org.apache.pulsar.client.impl.MultiTopicsReaderTest</a>
```
:white_check_mark: testReadMessageWithBatchingWithMessageInclusive
:white_check_mark: testKeyHashRangeReader
:white_check_mark: testRemoveSubscriptionForReaderNeedRemoveCursor
:white_check_mark: testReadMessageWithBatching
:white_check_mark: testReadMessageWithoutBatchingWithMessageInclusive
:white_check_mark: testMultiReaderSeek
:white_check_mark: testReadMessageWithoutBatching
:white_check_mark: testReaderWithTimeLong
```
### :white_check_mark: <a id="user-content-r0s57" href="#r0s57">org.apache.pulsar.client.impl.NegativeAcksTest</a>
```
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
:white_check_mark: testNegativeAcks
```
### :white_check_mark: <a id="user-content-r0s58" href="#r0s58">org.apache.pulsar.client.impl.PatternTopicsConsumerImplTest</a>
```
:white_check_mark: testStartEmptyPatternConsumer
:white_check_mark: testBinaryProtoToGetTopicsOfNamespaceAll
:white_check_mark: testPatternTopicsSubscribeWithBuilderFail
:white_check_mark: testPubRateOnNonPersistent
:white_check_mark: testTopicDeletion
:white_check_mark: testAutoUnbubscribePatternConsumer
:white_check_mark: testTopicsPatternFilter
:white_check_mark: testBinaryProtoToGetTopicsOfNamespaceNonPersistent
:white_check_mark: testBinaryProtoToGetTopicsOfNamespacePersistent
:white_check_mark: testTopicsListMinus
:white_check_mark: testAutoSubscribePatternConsumer
```
### :white_check_mark: <a id="user-content-r0s59" href="#r0s59">org.apache.pulsar.client.impl.PerMessageUnAcknowledgedRedeliveryTest</a>
```
:white_check_mark: testSharedAckedNormalTopic
:white_check_mark: testUnAckedMessageTrackerSize
:white_check_mark: testSharedAckedPartitionedTopic
:white_check_mark: testExclusiveAckedNormalTopic
:white_check_mark: testFailoverAckedNormalTopic
```
### :white_check_mark: <a id="user-content-r0s60" href="#r0s60">org.apache.pulsar.client.impl.PulsarMultiHostClientTest</a>
```
:white_check_mark: testMultiHostUrlRetrySuccess
:white_check_mark: testGetPartitionedTopicDataTimeout
:white_check_mark: testGetPartitionedTopicMetaData
```
### :white_check_mark: <a id="user-content-r0s61" href="#r0s61">org.apache.pulsar.client.impl.RawMessageSerDeserTest</a>
```
:white_check_mark: testSerializationAndDeserialization
```
### :white_check_mark: <a id="user-content-r0s62" href="#r0s62">org.apache.pulsar.client.impl.SchemaDeleteTest</a>
```
:white_check_mark: createTopicDeleteTopicCreateTopic
```
### :white_check_mark: <a id="user-content-r0s63" href="#r0s63">org.apache.pulsar.client.impl.SequenceIdWithErrorTest</a>
```
:white_check_mark: testCheckSequenceId
:white_check_mark: testDeleteTopicWithMissingData
:white_check_mark: testTopicWithWildCardChar
:warning: testCrashBrokerWithoutCursorLedgerLeak
:warning: testSkipCorruptDataLedger
```
### :white_check_mark: <a id="user-content-r0s64" href="#r0s64">org.apache.pulsar.client.impl.TopicDoesNotExistsTest</a>
```
:white_check_mark: testCreateConsumerOnNotExistsTopic
:white_check_mark: testCreateProducerOnNotExistsTopic
```
### :white_check_mark: <a id="user-content-r0s65" href="#r0s65">org.apache.pulsar.client.impl.TopicFromMessageTest</a>
```
:white_check_mark: testSingleTopicConsumerNoBatchFullName
:white_check_mark: testMultiTopicConsumerBatchShortName
:white_check_mark: testSingleTopicConsumerNoBatchShortName
:white_check_mark: testMultiTopicConsumerNoBatchShortName
:white_check_mark: testSingleTopicConsumerBatchShortName
```
### :white_check_mark: <a id="user-content-r0s66" href="#r0s66">org.apache.pulsar.client.impl.TopicsConsumerImplTest</a>
```
:white_check_mark: testTopicAutoUpdatePartitions
:white_check_mark: testDifferentTopicsNameSubscribe
:white_check_mark: testGetLastMessageId
:white_check_mark: testConsumerUnackedRedelivery
:white_check_mark: testSubscriptionMustCompleteWhenOperationTimeoutOnMultipleTopics
:white_check_mark: testConsumerDistributionInFailoverSubscriptionWhenUpdatePartitions
:white_check_mark: multiTopicsInDifferentNameSpace
:white_check_mark: testDefaultBacklogTTL
:white_check_mark: testGetConsumersAndGetTopics
:white_check_mark: testSubscribeUnsubscribeSingleTopic
:white_check_mark: testResubscribeSameTopic
:white_check_mark: testSyncProducerAndConsumer
:white_check_mark: testPartitionsUpdatesForMultipleTopics
:white_check_mark: testTopicsNameSubscribeWithBuilderFail
:white_check_mark: testMultiTopicsMessageListener
:white_check_mark: testTopicNameValid
:white_check_mark: testAsyncConsumer
```
### :white_check_mark: <a id="user-content-r0s67" href="#r0s67">org.apache.pulsar.client.impl.UnAcknowledgedMessagesTimeoutTest</a>
```
:white_check_mark: testCheckUnAcknowledgedMessageTimer
:white_check_mark: testExclusiveSingleAckedNormalTopic
:white_check_mark: testFailoverSingleAckedPartitionedTopic
:white_check_mark: testSharedSingleAckedPartitionedTopic
:white_check_mark: testAckTimeoutMinValue
:white_check_mark: testExclusiveCumulativeAckedNormalTopic
:white_check_mark: testSingleMessageBatch
```
### :white_check_mark: <a id="user-content-r0s68" href="#r0s68">org.apache.pulsar.client.impl.ZeroQueueSizeTest</a>
```
:white_check_mark: zeroQueueSizeSharedSubscription
:white_check_mark: testPauseAndResume
:white_check_mark: testZeroQueueSizeMessageRedeliveryForAsyncReceive
:white_check_mark: zeroQueueSizeConsumerListener
:white_check_mark: zeroQueueSizeFailoverSubscription
:white_check_mark: validQueueSizeConfig
:white_check_mark: zeroQueueSizeNormalConsumer
:white_check_mark: zeroQueueSizeReceieveAsyncInCompatibility
:white_check_mark: InvalidQueueSizeConfig
:white_check_mark: testZeroQueueSizeMessageRedeliveryForListener
:white_check_mark: testZeroQueueSizeMessageRedelivery
:white_check_mark: zeroQueueSizePartitionedTopicInCompatibility
:white_check_mark: testFailedZeroQueueSizeBatchMessage
:white_check_mark: testPauseAndResumeWithUnloading
```
### :white_check_mark: <a id="user-content-r0s69" href="#r0s69">org.apache.pulsar.common.api.raw.RawMessageImplTest</a>
```
:white_check_mark: testGetProperties
```
### :white_check_mark: <a id="user-content-r0s70" href="#r0s70">org.apache.pulsar.common.compression.CommandsTest</a>
```
:white_check_mark: testChecksumSendCommand
```
### :white_check_mark: <a id="user-content-r0s71" href="#r0s71">org.apache.pulsar.common.compression.CompressorCodecBackwardCompatTest</a>
```
:white_check_mark: testCompressDecompress
:white_check_mark: testCompressDecompress
:white_check_mark: testCompressDecompress
:white_check_mark: testCompressDecompress
:white_check_mark: testCompressDecompress
:white_check_mark: testCompressDecompress
```
### :white_check_mark: <a id="user-content-r0s72" href="#r0s72">org.apache.pulsar.common.compression.CompressorCodecTest</a>
```
:white_check_mark: testCompressDecompress
:white_check_mark: testMultpileUsages
:white_check_mark: testMultpileUsages
:white_check_mark: testCompressDecompress
:white_check_mark: testMultpileUsages
:white_check_mark: testCompressDecompress
:white_check_mark: testMultpileUsages
:white_check_mark: testCompressDecompress
:white_check_mark: testDecompressFromSampleBuffer
:white_check_mark: testDecompressReadonlyByteBuf
:white_check_mark: testDecompressReadonlyByteBuf
:white_check_mark: testCodecProvider
:white_check_mark: testEmptyInput
:white_check_mark: testEmptyInput
:white_check_mark: testCompressDecompress
:white_check_mark: testCodecProvider
:white_check_mark: testDecompressFromSampleBuffer
:white_check_mark: testMultpileUsages
:white_check_mark: testCodecProvider
:white_check_mark: testEmptyInput
:white_check_mark: testDecompressReadonlyByteBuf
:white_check_mark: testCompressDecompress
:white_check_mark: testDecompressReadonlyByteBuf
:white_check_mark: testCompressDecompress
:white_check_mark: testCompressDecompress
:white_check_mark: testMultpileUsages
:white_check_mark: testEmptyInput
:white_check_mark: testDecompressReadonlyByteBuf
:white_check_mark: testDecompressFromSampleBuffer
:white_check_mark: testDecompressFromSampleBuffer
:white_check_mark: testDecompressFromSampleBuffer
:white_check_mark: testDecompressReadonlyByteBuf
:white_check_mark: testDecompressReadonlyByteBuf
:white_check_mark: testMultpileUsages
:white_check_mark: testCompressDecompress
:white_check_mark: testCodecProvider
:white_check_mark: testMultpileUsages
:white_check_mark: testCompressDecompress
:white_check_mark: testMultpileUsages
:white_check_mark: testDecompressReadonlyByteBuf
:white_check_mark: testEmptyInput
:white_check_mark: testCodecProvider
:white_check_mark: testDecompressReadonlyByteBuf
:white_check_mark: testDecompressReadonlyByteBuf
:white_check_mark: testMultpileUsages
```
### :white_check_mark: <a id="user-content-r0s73" href="#r0s73">org.apache.pulsar.common.compression.Crc32cChecksumTest</a>
```
:white_check_mark: testCrc32cHardware
:white_check_mark: testCrc32cDirectMemoryHardware
:white_check_mark: testCrc32c
:white_check_mark: testCrc32cSoftware
:white_check_mark: testCrc32cIncremental
:white_check_mark: testCrc32cIncrementalUsingProvider
```
### :white_check_mark: <a id="user-content-r0s74" href="#r0s74">org.apache.pulsar.common.lookup.data.LookupDataTest</a>
```
:white_check_mark: testLoadReportSerialization
:white_check_mark: testUrlEncoder
:white_check_mark: serializeToJsonTest
:white_check_mark: withConstructor
```
### :white_check_mark: <a id="user-content-r0s75" href="#r0s75">org.apache.pulsar.common.naming.MetadataTests</a>
```
:white_check_mark: testInvalidMetadata
:white_check_mark: testValidMetadata
```
### :white_check_mark: <a id="user-content-r0s76" href="#r0s76">org.apache.pulsar.common.naming.NamespaceBundlesTest</a>
```
:white_check_mark: testConstructor
:white_check_mark: testSplitBundleInTwo
:white_check_mark: testsplitBundles
:white_check_mark: testFindBundle
:white_check_mark: testSplitBundleByFixBoundary
```
### :white_check_mark: <a id="user-content-r0s77" href="#r0s77">org.apache.pulsar.common.naming.NamespaceBundleTest</a>
```
:white_check_mark: testIncludes
:white_check_mark: testGetBundle
:white_check_mark: testCompareTo
:white_check_mark: testConstructor
:white_check_mark: testToString
:white_check_mark: testEquals
```
### :white_check_mark: <a id="user-content-r0s78" href="#r0s78">org.apache.pulsar.common.naming.NamespaceNameTest</a>
```
:white_check_mark: namespace
:white_check_mark: testNewScheme
```
### :white_check_mark: <a id="user-content-r0s79" href="#r0s79">org.apache.pulsar.common.naming.ServiceConfigurationTest</a>
```
:white_check_mark: testOptionalSettingPresent
:white_check_mark: testOptionalSettingEmpty
:white_check_mark: testInit
:white_check_mark: testInitFailure
```
### :white_check_mark: <a id="user-content-r0s80" href="#r0s80">org.apache.pulsar.common.naming.TopicNameTest</a>
```
:white_check_mark: testShortTopicName
:white_check_mark: topic
:white_check_mark: testTopicNameWithoutCluster
:white_check_mark: testDecodeEncode
```
### :white_check_mark: <a id="user-content-r0s81" href="#r0s81">org.apache.pulsar.common.net.ServiceURITest</a>
```
:white_check_mark: testEmptyServiceUriString
:white_check_mark: testMultipleHostsSemiColon
:white_check_mark: testInvalidServiceUris
:white_check_mark: testMultipleHostsWithoutHttpPorts
:white_check_mark: testRootPath
:white_check_mark: testMultipleHostsMixedPorts
:white_check_mark: testMultipleHostsWithoutPulsarTlsPorts
:white_check_mark: testUserInfoWithMultipleHosts
:white_check_mark: testMultipleHostsComma
:white_check_mark: testMultipleHostsMixed
:white_check_mark: testUserInfo
:white_check_mark: testIpv6UriWithoutPulsarPort
:white_check_mark: testMultiIpv6Uri
:white_check_mark: testMultiIpv6UriWithoutPulsarPort
:white_check_mark: testEmptyPath
:white_check_mark: testNullServiceUriString
:white_check_mark: testNullServiceUriInstance
:white_check_mark: testMissingServiceName
:white_check_mark: testMultipleHostsWithoutHttpsPorts
:white_check_mark: testMultipleHostsWithoutPulsarPorts
:white_check_mark: testIpv6Uri
```
### :white_check_mark: <a id="user-content-r0s82" href="#r0s82">org.apache.pulsar.common.policies.data.AutoFailoverPolicyDataTest</a>
```
:white_check_mark: testAutoFailoverPolicyData
```
### :white_check_mark: <a id="user-content-r0s83" href="#r0s83">org.apache.pulsar.common.policies.data.AutoFailoverPolicyTypeTest</a>
```
:white_check_mark: testAutoFailoverPolicyType
```
### :white_check_mark: <a id="user-content-r0s84" href="#r0s84">org.apache.pulsar.common.policies.data.AutoTopicCreationOverrideTest</a>
```
:white_check_mark: testInvalidTopicType
:white_check_mark: testNumPartitionsTooLow
:white_check_mark: testNumPartitionsNotSet
:white_check_mark: testValidOverrideNonPartitioned
:white_check_mark: testNumPartitionsOnNonPartitioned
:white_check_mark: testValidOverridePartitioned
```
### :white_check_mark: <a id="user-content-r0s85" href="#r0s85">org.apache.pulsar.common.policies.data.BacklogQuotaTest</a>
```
:white_check_mark: testBacklogQuotaIdentity
```
### :white_check_mark: <a id="user-content-r0s86" href="#r0s86">org.apache.pulsar.common.policies.data.ClusterDataTest</a>
```
:white_check_mark: simple
```
### :white_check_mark: <a id="user-content-r0s87" href="#r0s87">org.apache.pulsar.common.policies.data.ConsumerStatsTest</a>
```
:white_check_mark: testConsumerStats
```
### :white_check_mark: <a id="user-content-r0s88" href="#r0s88">org.apache.pulsar.common.policies.data.EnsemblePlacementPolicyConfigTest</a>
```
:white_check_mark: testDecodeFailed
:white_check_mark: testEncodeDecodeSuccessfully
```
### :white_check_mark: <a id="user-content-r0s89" href="#r0s89">org.apache.pulsar.common.policies.data.LocalPolicesTest</a>
```
:white_check_mark: testLocalPolices
```
### :white_check_mark: <a id="user-content-r0s90" href="#r0s90">org.apache.pulsar.common.policies.data.NamespaceIsolationDataTest</a>
```
:white_check_mark: testNamespaceIsolationData
```
### :white_check_mark: <a id="user-content-r0s91" href="#r0s91">org.apache.pulsar.common.policies.data.NamespaceOwnershipStatusTest</a>
```
:white_check_mark: testSerialization
```
### :white_check_mark: <a id="user-content-r0s92" href="#r0s92">org.apache.pulsar.common.policies.data.OffloadPoliciesTest</a>
```
:white_check_mark: testGcsConfiguration
:white_check_mark: mergeTest
:white_check_mark: compatibleWithConfigFileTest
:white_check_mark: testCreateByProperties
:white_check_mark: testS3Configuration
:white_check_mark: oldPoliciesCompatibleTest
```
### :white_check_mark: <a id="user-content-r0s93" href="#r0s93">org.apache.pulsar.common.policies.data.PartitionedTopicStatsTest</a>
```
:white_check_mark: testPartitionedTopicStats
```
### :white_check_mark: <a id="user-content-r0s94" href="#r0s94">org.apache.pulsar.common.policies.data.PersistencePoliciesTest</a>
```
:white_check_mark: testPersistencePolicies
```
### :white_check_mark: <a id="user-content-r0s95" href="#r0s95">org.apache.pulsar.common.policies.data.PersistentOfflineTopicStatsTest</a>
```
:white_check_mark: testPersistentOfflineTopicStats
```
### :white_check_mark: <a id="user-content-r0s96" href="#r0s96">org.apache.pulsar.common.policies.data.PersistentTopicStatsTest</a>
```
:white_check_mark: testPersistentTopicStatsAggregation
:white_check_mark: testPersistentTopicStats
```
### :white_check_mark: <a id="user-content-r0s97" href="#r0s97">org.apache.pulsar.common.policies.data.PoliciesDataTest</a>
```
:white_check_mark: propertyAdmin
:white_check_mark: policies
:white_check_mark: bundlesData
:white_check_mark: bundlesPolicies
```
### :white_check_mark: <a id="user-content-r0s98" href="#r0s98">org.apache.pulsar.common.policies.data.PublisherStatsTest</a>
```
:white_check_mark: testPublisherStats
:white_check_mark: testPublisherStatsAggregation
```
### :white_check_mark: <a id="user-content-r0s99" href="#r0s99">org.apache.pulsar.common.policies.data.ReplicatorStatsTest</a>
```
:white_check_mark: testReplicatorStatsAdd
:white_check_mark: testReplicatorStatsNull
```
### :white_check_mark: <a id="user-content-r0s100" href="#r0s100">org.apache.pulsar.common.policies.data.ResourceQuotaTest</a>
```
:white_check_mark: testResourceQuotaDefault
:white_check_mark: testResourceQuotaEqual
```
### :white_check_mark: <a id="user-content-r0s101" href="#r0s101">org.apache.pulsar.common.policies.data.RetentionPolicesTest</a>
```
:white_check_mark: testRetentionPolices
```
### :white_check_mark: <a id="user-content-r0s102" href="#r0s102">org.apache.pulsar.common.policies.impl.AutoFailoverPolicyFactoryTest</a>
```
:white_check_mark: testAutoFailoverPolicyFactory
```
### :white_check_mark: <a id="user-content-r0s103" href="#r0s103">org.apache.pulsar.common.policies.impl.MinAvailablePolicyTest</a>
```
:white_check_mark: testMinAvailablePolicty
```
### :white_check_mark: <a id="user-content-r0s104" href="#r0s104">org.apache.pulsar.common.policies.impl.NamespaceIsolationPoliciesTest</a>
```
:white_check_mark: testBrokerAssignment
:white_check_mark: testGetNamespaceIsolationPolicyByName
:white_check_mark: testDeletePolicy
:white_check_mark: testSetPolicy
:white_check_mark: testJsonSerialization
:white_check_mark: testDefaultConstructor
:white_check_mark: testGetNamespaceIsolationPolicyByNamespace
```
### :white_check_mark: <a id="user-content-r0s105" href="#r0s105">org.apache.pulsar.common.policies.impl.NamespaceIsolationPolicyImplTest</a>
```
:white_check_mark: testFindBrokers
:white_check_mark: testGetSecondaryBrokers
:white_check_mark: testShouldFailover
:white_check_mark: testGetPrimaryBrokers
:white_check_mark: testGetAvailablePrimaryBrokers
:white_check_mark: testConstructor
:white_check_mark: testIsPrimaryOrSecondaryBroker
```
### :white_check_mark: <a id="user-content-r0s106" href="#r0s106">org.apache.pulsar.common.protocol.ByteBufPairTest</a>
```
:white_check_mark: testEncoder
:white_check_mark: testDoubleByteBuf
```
### :white_check_mark: <a id="user-content-r0s107" href="#r0s107">org.apache.pulsar.common.protocol.CommandUtilsTests</a>
```
:white_check_mark: testSkipBrokerEntryMetadata
:white_check_mark: testPeekBrokerEntryMetadata
:white_check_mark: testParseBrokerEntryMetadata
:white_check_mark: testMetadataFromCommandSubscribe
:white_check_mark: testMetadataFromCommandProducer
:white_check_mark: testAddBrokerEntryMetadata
:white_check_mark: testByteBufComposite
```
### :white_check_mark: <a id="user-content-r0s108" href="#r0s108">org.apache.pulsar.common.protocol.MarkersTest</a>
```
:white_check_mark: testSnapshot
:white_check_mark: testTxnAbortMarker
:white_check_mark: testUpdate
:white_check_mark: testTxnCommitMarker
:white_check_mark: testSnapshotRequest
:white_check_mark: testSnapshotResponse
```
### :white_check_mark: <a id="user-content-r0s109" href="#r0s109">org.apache.pulsar.common.protocol.PulsarDecoderTest</a>
```
:white_check_mark: testChannelRead
```
### :white_check_mark: <a id="user-content-r0s110" href="#r0s110">org.apache.pulsar.common.stats.JvmDefaultGCMetricsLoggerTest</a>
```
:white_check_mark: testInvokeJVMInternals
```
### :white_check_mark: <a id="user-content-r0s111" href="#r0s111">org.apache.pulsar.common.util.collections.BitSetRecyclableRecyclableTest</a>
```
:white_check_mark: testResetWords
:white_check_mark: testRecycle
```
### :white_check_mark: <a id="user-content-r0s112" href="#r0s112">org.apache.pulsar.common.util.collections.ConcurrentBitSetRecyclableTest</a>
```
:white_check_mark: testRecycle
:white_check_mark: testGenerateByBitSet
```
### :white_check_mark: <a id="user-content-r0s113" href="#r0s113">org.apache.pulsar.common.util.collections.ConcurrentLongHashMapTest</a>
```
:white_check_mark: testRehashingWithDeletes
:white_check_mark: concurrentInsertionsAndReads
:white_check_mark: testRemove
:white_check_mark: testRehashing
:white_check_mark: simpleInsertions
:white_check_mark: testComputeIfAbsent
:white_check_mark: testConstructor
:white_check_mark: testPutIfAbsent
:white_check_mark: testIteration
:white_check_mark: testHashConflictWithDeletion
:white_check_mark: concurrentInsertions
:white_check_mark: stressConcurrentInsertionsAndReads
:white_check_mark: testNegativeUsedBucketCount
```
### :white_check_mark: <a id="user-content-r0s114" href="#r0s114">org.apache.pulsar.common.util.collections.ConcurrentLongPairSetTest</a>
```
:white_check_mark: concurrentInsertionsAndReads
:white_check_mark: testEqualsObjects
:white_check_mark: testIfRemoval
:white_check_mark: testRehashing
:white_check_mark: testToString
:white_check_mark: testRemove
:white_check_mark: testItems
:white_check_mark: testRehashingWithDeletes
:white_check_mark: testHashConflictWithDeletion
:white_check_mark: testIteration
:white_check_mark: simpleInsertions
:white_check_mark: testRehashingRemoval
:white_check_mark: testRemoval
:white_check_mark: testConstructor
:white_check_mark: concurrentInsertions
```
### :white_check_mark: <a id="user-content-r0s115" href="#r0s115">org.apache.pulsar.common.util.collections.ConcurrentOpenHashMapTest</a>
```
:white_check_mark: testRemove
:white_check_mark: simpleInsertions
:white_check_mark: testPutIfAbsent
:white_check_mark: concurrentInsertions
:white_check_mark: testHashConflictWithDeletion
:white_check_mark: testRehashingWithDeletes
:white_check_mark: testComputeIfAbsent
:white_check_mark: testRehashing
:white_check_mark: testIteration
:white_check_mark: testEqualsKeys
:white_check_mark: concurrentInsertionsAndReads
:white_check_mark: testConstructor
```
### :white_check_mark: <a id="user-content-r0s116" href="#r0s116">org.apache.pulsar.common.util.collections.ConcurrentOpenHashSetTest</a>
```
:white_check_mark: concurrentInsertions
:white_check_mark: testRehashing
:white_check_mark: testRemoval
:white_check_mark: testEqualsObjects
:white_check_mark: testHashConflictWithDeletion
:white_check_mark: testConstructor
:white_check_mark: concurrentInsertionsAndReads
:white_check_mark: testIteration
:white_check_mark: simpleInsertions
:white_check_mark: testRehashingWithDeletes
:white_check_mark: testRemove
```
### :white_check_mark: <a id="user-content-r0s117" href="#r0s117">org.apache.pulsar.common.util.collections.ConcurrentOpenLongPairRangeSetTest</a>
```
:white_check_mark: testAddForDifferentKey
:white_check_mark: testToString
:white_check_mark: testCacheFlagConflict
:white_check_mark: testDeleteWithLeastMost
:white_check_mark: testDeleteForDifferentKey
:white_check_mark: testLastRange
:white_check_mark: testAddCompareCompareWithGuava
:white_check_mark: testSpanWithGuava
:white_check_mark: testDeleteCompareWithGuava
:white_check_mark: testFirstRange
:white_check_mark: testAddForSameKey
:white_check_mark: testDeleteWithAtMost
:white_check_mark: testRangeContaining
```
### :white_check_mark: <a id="user-content-r0s118" href="#r0s118">org.apache.pulsar.common.util.collections.ConcurrentSortedLongPairSetTest</a>
```
:white_check_mark: concurrentInsertions
:white_check_mark: testIfRemoval
:white_check_mark: testRemoval
:white_check_mark: testRemove
:white_check_mark: testItems
:white_check_mark: testEqualsObjects
:white_check_mark: simpleInsertions
:white_check_mark: testIteration
:white_check_mark: testToString
```
### :white_check_mark: <a id="user-content-r0s119" href="#r0s119">org.apache.pulsar.common.util.collections.FieldParserTest</a>
```
:white_check_mark: testUpdateObject
:white_check_mark: testConversion
```
### :white_check_mark: <a id="user-content-r0s120" href="#r0s120">org.apache.pulsar.common.util.collections.GrowableArrayBlockingQueueTest</a>
```
:white_check_mark: removeTest
:white_check_mark: growArray
:white_check_mark: pollTimeout
:white_check_mark: simple
:white_check_mark: pollTimeout2
:white_check_mark: blockingTake
```
### :white_check_mark: <a id="user-content-r0s121" href="#r0s121">org.apache.pulsar.common.util.collections.GrowablePriorityLongPairQueueTest</a>
```
:white_check_mark: testItems
:white_check_mark: testRemove
:white_check_mark: testExpandQueue
:white_check_mark: testInsertAndRemove
:white_check_mark: testEqualsObjects
:white_check_mark: testExpandRemoval
:white_check_mark: testIteration
:white_check_mark: simpleInsertions
:white_check_mark: concurrentInsertions
:white_check_mark: testConstructor
:white_check_mark: testSetWithDuplicateInsert
:white_check_mark: testExpandWithDeletes
:white_check_mark: concurrentInsertionsAndReads
:white_check_mark: testRemoval
:white_check_mark: testIfRemoval
```
### :white_check_mark: <a id="user-content-r0s122" href="#r0s122">org.apache.pulsar.common.util.collections.TripleLongPriorityQueueTest</a>
```
:white_check_mark: testQueue
:white_check_mark: testCheckForEmpty
:white_check_mark: testCompareWithSamePrefix
```
### :white_check_mark: <a id="user-content-r0s123" href="#r0s123">org.apache.pulsar.common.util.FieldParserTest</a>
```
:white_check_mark: testMap
```
### :white_check_mark: <a id="user-content-r0s124" href="#r0s124">org.apache.pulsar.common.util.FileModifiedTimeUpdaterTest</a>
```
:white_check_mark: testFileNotModified
:white_check_mark: testFileModified
:white_check_mark: testFileModified
:white_check_mark: testFileNotModified
:white_check_mark: testFileModified
:white_check_mark: testFileNotModified
```
### :white_check_mark: <a id="user-content-r0s125" href="#r0s125">org.apache.pulsar.common.util.netty.ChannelFuturesTest</a>
```
:white_check_mark: toCompletableFuture_shouldCompleteExceptionally_channelFutureCompletedAfter
:white_check_mark: toCompletableFuture_shouldCompleteSuccessfully_channelFutureCompletedAfter
:white_check_mark: toCompletableFuture_shouldCompleteSuccessfully_channelFutureCompletedBefore
:white_check_mark: toCompletableFuture_shouldCompleteExceptionally_channelFutureCompletedBefore
:white_check_mark: toCompletableFuture_shouldRequireNonNullArgument
```
### :white_check_mark: <a id="user-content-r0s126" href="#r0s126">org.apache.pulsar.common.util.RateLimiterTest</a>
```
:white_check_mark: testMultipleTryAcquire
:white_check_mark: testRateLimiterWithPermitUpdater
:white_check_mark: testTryAcquire
:white_check_mark: testTryAcquireNoPermits
:white_check_mark: testClose
:white_check_mark: testResetRate
:white_check_mark: testMultipleAcquire
:white_check_mark: testAcquire
:white_check_mark: testInvalidRenewTime
:white_check_mark: testRateLimiterWithFunction
:white_check_mark: testAcquireBlock
```
### :white_check_mark: <a id="user-content-r0s127" href="#r0s127">org.apache.pulsar.common.util.ReflectionsTest</a>
```
:white_check_mark: testCreateInstanceNoNoArgConstructor
:white_check_mark: testCreateInstanceConstructorThrowsException
:white_check_mark: testCreateInstanceAbstractClass
:white_check_mark: testCreateTypedInstanceUnassignableClass
:white_check_mark: testCreateInstanceClassNotFound
:white_check_mark: testCreateTypedInstanceConstructorThrowsException
:white_check_mark: testClassExists
:white_check_mark: testCreateTypedInstanceAbstractClass
:white_check_mark: testCreateTypedInstanceClassNotFound
:white_check_mark: testCreateTypedInstanceNoNoArgConstructor
:white_check_mark: testLoadClass
:white_check_mark: testClassInJarImplementsIface
```
### :white_check_mark: <a id="user-content-r0s128" href="#r0s128">org.apache.pulsar.common.util.RelativeTimeUtilTest</a>
```
:white_check_mark: testParseRelativeTime
```
### :white_check_mark: <a id="user-content-r0s129" href="#r0s129">org.apache.pulsar.discovery.service.web.DiscoveryServiceWebTest</a>
```
:white_check_mark: testRedirectUrlWithServerStarted
```
### :white_check_mark: <a id="user-content-r0s130" href="#r0s130">org.apache.pulsar.functions.worker.PulsarFunctionE2ESecurityTest</a>
```
:white_check_mark: testAuthorizationWithAnonymousUser
:white_check_mark: testAuthorization
```
### :white_check_mark: <a id="user-content-r0s131" href="#r0s131">org.apache.pulsar.functions.worker.PulsarFunctionPublishTest</a>
```
:white_check_mark: testPulsarFunctionState
:white_check_mark: testMultipleAddress
:white_check_mark: testPulsarFunctionBKCleanup
```
### :white_check_mark: <a id="user-content-r0s132" href="#r0s132">org.apache.pulsar.functions.worker.PulsarFunctionTlsTest</a>
```
:white_check_mark: testFunctionsCreation
```
### :white_check_mark: <a id="user-content-r0s133" href="#r0s133">org.apache.pulsar.io.PulsarFunctionTlsTest</a>
```
:white_check_mark: testAuthorization
```
### :white_check_mark: <a id="user-content-r0s134" href="#r0s134">org.apache.pulsar.proxy.server.AdminProxyHandlerTest</a>
```
:white_check_mark: replayableProxyContentProviderTest
```
### :white_check_mark: <a id="user-content-r0s135" href="#r0s135">org.apache.pulsar.proxy.server.AuthedAdminProxyHandlerTest</a>
```
:white_check_mark: testAuthenticatedProxyAsNonAdmin
```
### :white_check_mark: <a id="user-content-r0s136" href="#r0s136">org.apache.pulsar.proxy.server.FunctionWorkerRoutingTest</a>
```
:white_check_mark: testFunctionWorkerRedirect
```
### :white_check_mark: <a id="user-content-r0s137" href="#r0s137">org.apache.pulsar.proxy.server.ProxyAdditionalServletTest</a>
```
:white_check_mark: test
```
### :white_check_mark: <a id="user-content-r0s138" href="#r0s138">org.apache.pulsar.proxy.server.ProxyAuthenticatedProducerConsumerTest</a>
```
:white_check_mark: testTlsSyncProducerAndConsumer
```
### :white_check_mark: <a id="user-content-r0s139" href="#r0s139">org.apache.pulsar.proxy.server.ProxyAuthenticationTest</a>
```
:white_check_mark: testAuthentication
```
### :white_check_mark: <a id="user-content-r0s140" href="#r0s140">org.apache.pulsar.proxy.server.ProxyConnectionThrottlingTest</a>
```
:white_check_mark: testInboundConnection
```
### :white_check_mark: <a id="user-content-r0s141" href="#r0s141">org.apache.pulsar.proxy.server.ProxyEnableHAProxyProtocolTest</a>
```
:white_check_mark: testSimpleProduceAndConsume
```
### :white_check_mark: <a id="user-content-r0s142" href="#r0s142">org.apache.pulsar.proxy.server.ProxyForwardAuthDataTest</a>
```
:white_check_mark: testForwardAuthData
```
### :white_check_mark: <a id="user-content-r0s143" href="#r0s143">org.apache.pulsar.proxy.server.ProxyIsAHttpProxyTest</a>
```
:white_check_mark: testProxyToEndsInSlash
:white_check_mark: testStreaming
:white_check_mark: testLongPath
:white_check_mark: testLongPathInProxyTo
:white_check_mark: testPathEndsInSlash
:white_check_mark: testPathNotSpecified
:white_check_mark: testTryingToUseExistingPath
:white_check_mark: testMultipleRedirect
:white_check_mark: testSingleRedirect
:white_check_mark: testRedirectNotSpecified
```
### :white_check_mark: <a id="user-content-r0s144" href="#r0s144">org.apache.pulsar.proxy.server.ProxyKeyStoreTlsTestWithAuth</a>
```
:white_check_mark: testProducerFailed
:white_check_mark: testPartitions
:white_check_mark: testProducer
```
### :white_check_mark: <a id="user-content-r0s145" href="#r0s145">org.apache.pulsar.proxy.server.ProxyKeyStoreTlsTestWithoutAuth</a>
```
:white_check_mark: testPartitions
:white_check_mark: testProducerFailed
:white_check_mark: testProducer
```
### :white_check_mark: <a id="user-content-r0s146" href="#r0s146">org.apache.pulsar.proxy.server.ProxyLookupThrottlingTest</a>
```
:white_check_mark: testLookup
```
### :white_check_mark: <a id="user-content-r0s147" href="#r0s147">org.apache.pulsar.proxy.server.ProxyParserTest</a>
```
:white_check_mark: testRegexSubscription
:white_check_mark: testProducerConsumer
:white_check_mark: testProducer
:white_check_mark: testPartitions
:white_check_mark: testProtocolVersionAdvertisement
```
### :white_check_mark: <a id="user-content-r0s148" href="#r0s148">org.apache.pulsar.proxy.server.ProxyRolesEnforcementTest</a>
```
:white_check_mark: testIncorrectRoles
```
### :white_check_mark: <a id="user-content-r0s149" href="#r0s149">org.apache.pulsar.proxy.server.ProxyStatsTest</a>
```
:white_check_mark: testChangeLogLevel
:white_check_mark: testConnectionsStats
:white_check_mark: testTopicStats
```
### :white_check_mark: <a id="user-content-r0s150" href="#r0s150">org.apache.pulsar.proxy.server.ProxyTest</a>
```
:white_check_mark: testPartitions
:white_check_mark: testRegexSubscription
:white_check_mark: testProtocolVersionAdvertisement
:white_check_mark: testGetSchema
:white_check_mark: testProducer
:white_check_mark: testProducerConsumer
```
### :white_check_mark: <a id="user-content-r0s151" href="#r0s151">org.apache.pulsar.proxy.server.ProxyTlsTest</a>
```
:white_check_mark: testProducer
:white_check_mark: testPartitions
```
### :white_check_mark: <a id="user-content-r0s152" href="#r0s152">org.apache.pulsar.proxy.server.ProxyTlsTestWithAuth</a>
```
:white_check_mark: testServiceStartup
```
### :white_check_mark: <a id="user-content-r0s153" href="#r0s153">org.apache.pulsar.proxy.server.ProxyWithAuthorizationNegTest</a>
```
:white_check_mark: testProxyAuthorization
```
### :white_check_mark: <a id="user-content-r0s154" href="#r0s154">org.apache.pulsar.proxy.server.ProxyWithAuthorizationTest</a>
```
:white_check_mark: tlsCiphersAndProtocols
:white_check_mark: testTlsHostVerificationProxyToClient
:white_check_mark: tlsCiphersAndProtocols
:white_check_mark: testProxyAuthorization
:white_check_mark: tlsCiphersAndProtocols
:white_check_mark: testTlsHostVerificationProxyToBroker
:white_check_mark: tlsCiphersAndProtocols
:white_check_mark: tlsCiphersAndProtocols
:white_check_mark: tlsCiphersAndProtocols
:white_check_mark: testTlsHostVerificationProxyToBroker
:white_check_mark: tlsCiphersAndProtocols
:white_check_mark: testTlsHostVerificationProxyToClient
:white_check_mark: tlsCiphersAndProtocols
```
### :white_check_mark: <a id="user-content-r0s155" href="#r0s155">org.apache.pulsar.proxy.server.ProxyWithoutServiceDiscoveryTest</a>
```
:white_check_mark: testDiscoveryService
```
### :white_check_mark: <a id="user-content-r0s156" href="#r0s156">org.apache.pulsar.proxy.server.SuperUserAuthedAdminProxyHandlerTest</a>
```
:white_check_mark: testAuthWithRandoCert
:white_check_mark: testAuthenticatedProxyAsAdmin
:white_check_mark: testAuthenticatedProxyAsNonAdmin
```
### :white_check_mark: <a id="user-content-r0s157" href="#r0s157">org.apache.pulsar.proxy.server.UnauthedAdminProxyHandlerTest</a>
```
:white_check_mark: testUnauthenticatedProxy
:white_check_mark: testVipStatus
```
### :white_check_mark: <a id="user-content-r0s158" href="#r0s158">org.apache.pulsar.PulsarBrokerStarterTest</a>
```
:white_check_mark: testMainRunBookieNoConfig
:white_check_mark: testLoadConfigWithException
:white_check_mark: testMainWithNoArgument
:white_check_mark: testLoadBalancerConfig
:white_check_mark: testGlobalZooKeeperConfig
:white_check_mark: testMainRunBookieRecoveryNoConfig
:white_check_mark: testLoadConfig
:white_check_mark: testMainEnableRunBookieThroughBrokerConfig
:white_check_mark: testMainRunBookieAndAutoRecoveryNoConfig
```
### :white_check_mark: <a id="user-content-r0s159" href="#r0s159">org.apache.pulsar.schema.compatibility.SchemaCompatibilityCheckTest</a>
```
:white_check_mark: testConsumerCompatibilityCheckCanReadLastTest
:white_check_mark: testConsumerWithNotCompatibilitySchema
:white_check_mark: testProducerSendWithOldSchemaAndConsumerCanRead
:white_check_mark: testConsumerCompatibilityCheckCanReadLastTest
:white_check_mark: testProducerSendWithOldSchemaAndConsumerCanRead
:white_check_mark: testSchemaComparison
:white_check_mark: testConsumerCompatibilityCheckCanReadLastTest
:white_check_mark: testConsumerCompatibilityReadAllCheckTest
:white_check_mark: testConsumerWithNotCompatibilitySchema
:white_check_mark: testIsAutoUpdateSchema
:white_check_mark: testProducerSendWithOldSchemaAndConsumerCanRead
:white_check_mark: testConsumerCompatibilityReadAllCheckTest
:white_check_mark: testIsAutoUpdateSchema
:white_check_mark: testProducerSendWithOldSchemaAndConsumerCanRead
:white_check_mark: testConsumerWithNotCompatibilitySchema
:white_check_mark: testIsAutoUpdateSchema
:white_check_mark: testProducerSendWithOldSchemaAndConsumerCanRead
:white_check_mark: testConsumerWithNotCompatibilitySchema
:white_check_mark: testProducerSendWithOldSchemaAndConsumerCanRead
:white_check_mark: testIsAutoUpdateSchema
:white_check_mark: testIsAutoUpdateSchema
:white_check_mark: testConsumerCompatibilityCheckCanReadLastTest
:white_check_mark: testIsAutoUpdateSchema
```
### :white_check_mark: <a id="user-content-r0s160" href="#r0s160">org.apache.pulsar.schema.PartitionedTopicSchemaTest</a>
```
:white_check_mark: test
```
### :white_check_mark: <a id="user-content-r0s161" href="#r0s161">org.apache.pulsar.schema.SchemaTest</a>
```
:white_check_mark: testIsUsingAvroSchemaParser
:white_check_mark: testBytesSchemaDeserialize
:white_check_mark: testMultiTopicSetSchemaProvider
```
### :white_check_mark: <a id="user-content-r0s162" href="#r0s162">org.apache.pulsar.stats.client.PulsarBrokerStatsClientTest</a>
```
:white_check_mark: testServiceException
:white_check_mark: testTopicInternalStats
```
### :white_check_mark: <a id="user-content-r0s163" href="#r0s163">org.apache.pulsar.tests.EnumValuesDataProviderTest</a>
```
:white_check_mark: shouldFailIfEnumParameterIsMissing
:white_check_mark: testEnumValuesProvider
:white_check_mark: testEnumValuesProvider
:white_check_mark: shouldDetermineEnumValuesFromMethod
:white_check_mark: shouldContainAllEnumValues
:white_check_mark: testEnumValuesProvider
```
### :white_check_mark: <a id="user-content-r0s164" href="#r0s164">org.apache.pulsar.tests.TestRetrySupportBeforeMethodRetryTest</a>
```
:white_check_mark: shouldNotDoAnythingWhenThereIsBeforeAndAfterMethod
:warning: shouldNotDoAnythingWhenThereIsBeforeAndAfterMethod
:warning: shouldNotDoAnythingWhenThereIsBeforeAndAfterMethod
:warning: shouldNotDoAnythingWhenThereIsBeforeAndAfterMethod
:warning: shouldNotDoAnythingWhenThereIsBeforeAndAfterMethod
```
### :white_check_mark: <a id="user-content-r0s165" href="#r0s165">org.apache.pulsar.tests.TestRetrySupportRetryTest</a>
```
:warning: shouldCallSetupBeforeRetrying
:white_check_mark: shouldCallSetupBeforeRetrying
:warning: shouldCallSetupBeforeRetrying
:warning: shouldCallSetupBeforeRetrying
:warning: shouldCallSetupBeforeRetrying
```
### :white_check_mark: <a id="user-content-r0s166" href="#r0s166">org.apache.pulsar.tests.TestRetrySupportSuccessTest</a>
```
:white_check_mark: shouldCallSetupOnce1
:white_check_mark: shouldCallSetupOnce3
:white_check_mark: shouldCallSetupOnce2
```
### :white_check_mark: <a id="user-content-r0s167" href="#r0s167">org.apache.pulsar.tests.ThreadDumpUtilTest</a>
```
:white_check_mark: testHelp
:white_check_mark: testThreadDump
```
### :white_check_mark: <a id="user-content-r0s168" href="#r0s168">org.apache.pulsar.utils.SimpleTextOutputStreamTest</a>
```
:white_check_mark: testBooleanFormat
:white_check_mark: testDoubleFormat
:white_check_mark: testLongFormat
:white_check_mark: testString
```
### :white_check_mark: <a id="user-content-r0s169" href="#r0s169">org.apache.pulsar.utils.StatsOutputStreamTest</a>
```
:white_check_mark: testLists
:white_check_mark: testNamedObjects
:white_check_mark: testNestedObjects
:white_check_mark: testNamedLists
:white_check_mark: testPairs
:white_check_mark: testObjects
```
### :white_check_mark: <a id="user-content-r0s170" href="#r0s170">org.apache.pulsar.websocket.proxy.ProxyAuthenticationTest</a>
```
:white_check_mark: unauthenticatedSocketTest
:white_check_mark: authenticatedSocketTest
:white_check_mark: statsTest
:white_check_mark: anonymousSocketTest
```
### :white_check_mark: <a id="user-content-r0s171" href="#r0s171">org.apache.pulsar.websocket.proxy.ProxyAuthorizationTest</a>
```
:white_check_mark: test
```
### :white_check_mark: <a id="user-content-r0s172" href="#r0s172">org.apache.pulsar.websocket.proxy.ProxyConfigurationTest</a>
```
:white_check_mark: configTest
:white_check_mark: configTest
```
### :white_check_mark: <a id="user-content-r0s173" href="#r0s173">org.apache.pulsar.websocket.proxy.ProxyPublishConsumeTlsTest</a>
```
:white_check_mark: socketTest
```
### :white_check_mark: <a id="user-content-r0s174" href="#r0s174">org.apache.pulsar.websocket.proxy.ProxyPublishConsumeWithoutZKTest</a>
```
:white_check_mark: socketTest
```
### :white_check_mark: <a id="user-content-r0s175" href="#r0s175">org.apache.pulsar.websocket.proxy.v1.V1_ProxyAuthenticationTest</a>
```
:white_check_mark: anonymousSocketTest
:white_check_mark: authenticatedSocketTest
:white_check_mark: statsTest
:white_check_mark: unauthenticatedSocketTest
```