# IPSの仕様

IPS(International Patient Summary)とは多数の医療機関の
データをまとめ出し、カテゴリーごとに表示できるようにできる機能の仕様です。
どこの国でもどこの医療機関でも同じ仕様で表示されるため、
外診、救急、初診の際にIPSが取り入れられるとトリアージ、引き継ぎの際コミュニケーション、
医療情報の連絡などの際の重要な情報の伝達ツールとして国際的に利用できます。
IPS基準の作成には　CEN, HL7, IHE, ISO, and SNOMEDなどの医療基準設定各機関
やGlobal Digital Health Partnership (GDHP), the G7, the G20 and World Health Organization (WHO)が参加しています。

詳しくは、こちら[https://international-patient-summary.net/](https://international-patient-summary.net/)を参考にしてください。


## 実装例

[The Commons Project](https://www.commonhealth.org/network)では１３００以上のネットワークから
IPSを一括に作成できるツールを開発し　またそのIPSを閲覧できるツールも[オープンソース](https://github.com/the-commons-project/shc-web-reader)で公開し、（下記参照）色々な場面で個人の意思により
情報を公開できるようになっています。


https://github.com/airinterface/dxhealth.jp/assets/2448586/38335744-7bd0-4e1a-abf4-fe10a726dd62



IPSの情報の相互運用性の実装の際の内容は[こちら](/blogs/実装例/SHLの作成と取り込み)にまとめてあります。


## IPS の構成

IPSはケアの引き継ぎ、移行の際、全てではなく、必要最小限の情報で構成されています。


構成のTemplateは[CDA R2](https://www.hl7.org/implement/standards/product_brief.cfm?product_id=447)を使用しています。
その中で、[FHIRのComposition](http://build.fhir.org/ig/HL7/fhir-ips/) (現在のバージョン) の構成
に従い、情報が入っています。

IPS は [FHIR R4](https://build.fhir.org/bundle.html)のフォーマットを使っています。
Bundleには entry というプロパティがあり、その中はResourceのリストとなります。その一番初めの
ResourceのタイプはIPSの場合、Compositionとなります。


その中には　Header, 必要項目、推奨項目、任意項目　が入ります。
Composition にHeaderが入り、
Composition の　entry　のレコードの中にはHeader以外の情報が下記のカテゴリーになって入って行きます。
また、そのCompositionのリソースにsectionというFieldの中にそれぞれにカテゴリーごとに
実際のデータのリファレンスが記載されています。


### Header
Subject：連絡タイトル
Author：作成者
Attester：元の医療情報の承認者
Custodian：元の医療情報の管理者


### 必要項目、推奨項目、任意項目

#### 必要項目


- Medication Summary
- Allegies and Intolerances
- Problem List

#### 推奨項目

- Immunizations
- History of Procedure
- Medical Devices
- Diagnostic Results

### 任意項目
- Vital Signs
- Past History of illness
- Pregnancy
- Social History
- Functional Status
- Plan of Care
- Advance Directives

### Example Data
```
{
  "certStatus": "none",
  "fhir": {
    "resourceType": "Bundle",
    "identifier": {
      "system": "urn:ietf:rfc:4122",
      "value": "f6e7a74c-dbf2-4488-a9e7-5f1b63bc5fb7"
    },
    "type": "document",
    "timestamp": "2023-11-10T13:55:57.445-05:00",
    "entry": [
      {
        "fullUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe",
        "resource": {
          "resourceType": "Composition",
          "text": {
            "status": "generated",
            "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><div><h1>Allergies and Intolerances</h1><div><div><table class=\"hapiPropertyTable\"><caption>Allergies And Intolerances</caption><thead><tr><th>Allergen</th><th>Status</th><th>Category</th><th>Reaction</th><th>Severity</th><th>Comments</th><th>Onset</th></tr></thead><tbody></tbody></table></div></div></div><div><h1>Problem List</h1><div><div><table class=\"hapiPropertyTable\"><caption>Problem List</caption><thead><tr><th>Medical Problems</th><th>Status</th><th>Comments</th><th>Onset Date</th></tr></thead><tbody></tbody></table></div></div></div><div><h1>History of Immunizations</h1><div><div><table class=\"hapiPropertyTable\"><caption>Immunizations</caption><thead><tr><th>Immunization</th><th>Status</th><th>Dose Number</th><th>Manufacturer</th><th>Lot Number</th><th>Comments</th><th>Date</th></tr></thead><tbody></tbody></table></div></div></div><div><h1>History of Procedures</h1><div><div><table class=\"hapiPropertyTable\"><caption>History Of Procedures</caption><thead><tr><th>Procedure</th><th>Comments</th><th>Date</th></tr></thead><tbody></tbody></table></div></div></div><div><h1>Diagnostic Results</h1><div><div><table class=\"hapiPropertyTable\"><caption>Diagnostic Results: Observations</caption><thead><tr><th>Code</th><th>Result</th><th>Unit</th><th>Interpretation</th><th>Reference Range</th><th>Comments</th><th>Date</th></tr></thead><tbody></tbody></table><table class=\"hapiPropertyTable\"><caption>Diagnostic Results: Diagnostic Reports</caption><thead><tr><th>Code</th><th>Date</th></tr></thead><tbody></tbody></table></div></div></div><div><h1>Vital Signs</h1><div><div><table class=\"hapiPropertyTable\"><caption>Vital Signs</caption><thead><tr><th>Code</th><th>Result</th><th>Unit</th><th>Interpretation</th><th>Comments</th><th>Date</th></tr></thead><tbody></tbody></table></div></div></div></div>"
          },
          "status": "final",
          "type": {
            "coding": [
              {
                "system": "http://loinc.org",
                "code": "60591-5",
                "display": "Patient Summary Document"
              }
            ]
          },
          "subject": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "date": "2023-11-10T13:55:57.278-05:00",
          "author": [
            {
              "reference": "urn:uuid:39e750dc-7e4b-44c2-9d25-1bc7b1724841"
            }
          ],
          "title": "Patient Summary as of 11/10/2023",
          "confidentiality": "N",
          "attester": [
            {
              "mode": "personal",
              "party": {
                "reference": "urn:uuid:174e73a2-363f-4bde-9b1e-18d0156116f8"
              }
            }
          ],
          "custodian": {
            "reference": "urn:uuid:39e750dc-7e4b-44c2-9d25-1bc7b1724841"
          },
          "section": [
            {
              "title": "Allergies and Intolerances",
              "code": {
                "coding": [
                  {
                    "system": "http://loinc.org",
                    "code": "48765-2",
                    "display": "Allergies and Adverse Reactions"
                  }
                ]
              },
              "text": {
                "status": "generated",
                "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><table class=\"hapiPropertyTable\"><caption>Allergies And Intolerances</caption><thead><tr><th>Allergen</th><th>Status</th><th>Category</th><th>Reaction</th><th>Severity</th><th>Comments</th><th>Onset</th></tr></thead><tbody></tbody></table></div>"
              },
              "entry": [
                {
                  "reference": "urn:uuid:964025cf-d0bb-4c0e-9287-966a2bb7f558"
                },
                {
                  "reference": "urn:uuid:48ff3bd2-44ab-4796-9e68-f3fc0cdd0fd7"
                },
                {
                  "reference": "urn:uuid:8949dc7e-0836-4588-b092-a4e40ec27fc7"
                },
                {
                  "reference": "urn:uuid:d5651075-e7f4-41d1-ab0e-238c74c475c5"
                },
                {
                  "reference": "urn:uuid:84e2b6a7-8e74-44c4-8707-5e7e347cd39f"
                }
              ]
            },
            {
              "title": "Problem List",
              "code": {
                "coding": [
                  {
                    "system": "http://loinc.org",
                    "code": "11450-4",
                    "display": "Problem List"
                  }
                ]
              },
              "text": {
                "status": "generated",
                "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><table class=\"hapiPropertyTable\"><caption>Problem List</caption><thead><tr><th>Medical Problems</th><th>Status</th><th>Comments</th><th>Onset Date</th></tr></thead><tbody></tbody></table></div>"
              },
              "entry": [
                {
                  "reference": "urn:uuid:57688c6d-ef85-4e4b-a4fc-25502c040c3e"
                },
                {
                  "reference": "urn:uuid:56c44253-dde0-416c-a6a2-85d5ec6cf941"
                },
                {
                  "reference": "urn:uuid:b2f43163-67df-4309-9d76-b474dbc76e67"
                },
                {
                  "reference": "urn:uuid:e68513e1-4a6c-40b2-8299-9f969487b768"
                },
                {
                  "reference": "urn:uuid:e8843781-31dd-46bf-9c34-0e2b93d4121f"
                }
              ]
            },
            {
              "title": "History of Immunizations",
              "code": {
                "coding": [
                  {
                    "system": "http://loinc.org",
                    "code": "11369-6",
                    "display": "History of Immunizations"
                  }
                ]
              },
              "text": {
                "status": "generated",
                "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><table class=\"hapiPropertyTable\"><caption>Immunizations</caption><thead><tr><th>Immunization</th><th>Status</th><th>Dose Number</th><th>Manufacturer</th><th>Lot Number</th><th>Comments</th><th>Date</th></tr></thead><tbody></tbody></table></div>"
              },
              "entry": [
                {
                  "reference": "urn:uuid:65642db7-9a88-4b51-a24b-e21df608d6ed"
                },
                {
                  "reference": "urn:uuid:2659f180-87ca-422a-925f-877b73bda18a"
                },
                {
                  "reference": "urn:uuid:f70589b5-3f18-480c-83a3-ed11787c4fd6"
                },
                {
                  "reference": "urn:uuid:8380302e-cedb-406e-ab44-f24ab8adde03"
                },
                {
                  "reference": "urn:uuid:5488917e-2fe6-4b77-9bee-613a218bf3da"
                }
              ]
            },
            {
              "title": "History of Procedures",
              "code": {
                "coding": [
                  {
                    "system": "http://loinc.org",
                    "code": "47519-4",
                    "display": "History of Procedures"
                  }
                ]
              },
              "text": {
                "status": "generated",
                "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><table class=\"hapiPropertyTable\"><caption>History Of Procedures</caption><thead><tr><th>Procedure</th><th>Comments</th><th>Date</th></tr></thead><tbody></tbody></table></div>"
              },
              "entry": [
                {
                  "reference": "urn:uuid:c3cc6191-7e48-46b0-862a-15407b488bf0"
                }
              ]
            },
            {
              "title": "Diagnostic Results",
              "code": {
                "coding": [
                  {
                    "system": "http://loinc.org",
                    "code": "30954-2",
                    "display": "Diagnostic Results"
                  }
                ]
              },
              "text": {
                "status": "generated",
                "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><table class=\"hapiPropertyTable\"><caption>Diagnostic Results: Observations</caption><thead><tr><th>Code</th><th>Result</th><th>Unit</th><th>Interpretation</th><th>Reference Range</th><th>Comments</th><th>Date</th></tr></thead><tbody></tbody></table><table class=\"hapiPropertyTable\"><caption>Diagnostic Results: Diagnostic Reports</caption><thead><tr><th>Code</th><th>Date</th></tr></thead><tbody></tbody></table></div>"
              },
              "entry": [
                {
                  "reference": "urn:uuid:2256847b-05ee-4ad4-8fd5-6a2be858f4ed"
                }
              ]
            },
            {
              "title": "Vital Signs",
              "code": {
                "coding": [
                  {
                    "system": "http://loinc.org",
                    "code": "8716-3",
                    "display": "Vital Signs"
                  }
                ]
              },
              "text": {
                "status": "generated",
                "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><table class=\"hapiPropertyTable\"><caption>Vital Signs</caption><thead><tr><th>Code</th><th>Result</th><th>Unit</th><th>Interpretation</th><th>Comments</th><th>Date</th></tr></thead><tbody></tbody></table></div>"
              },
              "entry": [
                {
                  "reference": "urn:uuid:11067a3c-3b2a-4979-99f6-7f028070e794"
                },
                {
                  "reference": "urn:uuid:ca91ce71-1eff-4a79-a156-85908d8f392a"
                },
                {
                  "reference": "urn:uuid:ba3f26e0-d1a0-4b49-9030-335a21dfffe2"
                },
                {
                  "reference": "urn:uuid:0f43fd8d-c549-49fa-b407-0c865fd01de0"
                },
                {
                  "reference": "urn:uuid:c505163e-82bf-421b-aa6e-c6846ada7427"
                },
                {
                  "reference": "urn:uuid:83dc1b88-886d-4316-a0f2-77eeb7815ae9"
                }
              ]
            }
          ]
        }
      },
      {
        "fullUrl": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4",
        "resource": {
          "resourceType": "Patient",
          "meta": {
            "lastUpdated": "2022-05-02T14:38:21.000-04:00"
          },
          "extension": [
            {
              "url": "https://fhir.athena.io/StructureDefinition/ah-brand",
              "valueReference": {
                "reference": "Organization/a-14523.Brand-1"
              }
            },
            {
              "url": "https://fhir.athena.io/StructureDefinition/ah-chart-sharing-group",
              "valueReference": {
                "reference": "Organization/a-14523.CSG-1"
              }
            },
            {
              "url": "https://fhir.athena.io/StructureDefinition/ah-provider-group",
              "valueReference": {
                "reference": "Organization/a-14523.PG-1"
              }
            },
            {
              "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
              "valueCode": "UNK"
            }
          ],
          "identifier": [
            {
              "system": "https://fhir.athena.io/sid/ah-patient",
              "value": "a-14523.E-857"
            }
          ],
          "name": [
            {
              "use": "official",
              "family": "Testuser",
              "given": [
                "Phr"
              ],
              "period": {
                "start": "2021-03-28"
              }
            }
          ],
          "telecom": [
            {
              "system": "phone",
              "value": "(617) 402-8874",
              "use": "home"
            },
            {
              "system": "email",
              "value": "phrtest@mailinator.com"
            }
          ],
          "gender": "male",
          "birthDate": "2000-01-01",
          "address": [
            {
              "use": "home",
              "line": [
                "311 ARSENAL ST"
              ],
              "city": "WATERTOWN",
              "state": "MA",
              "postalCode": "02472",
              "country": "USA",
              "period": {
                "start": "2022-05-02"
              }
            },
            {
              "use": "billing",
              "type": "postal",
              "line": [
                "311 ARSENAL ST"
              ],
              "city": "WATERTOWN",
              "state": "MA",
              "postalCode": "02472",
              "country": "USA",
              "period": {
                "start": "2022-05-02"
              }
            }
          ]
        }
      },
      {
        "fullUrl": "urn:uuid:964025cf-d0bb-4c0e-9287-966a2bb7f558",
        "resource": {
          "resourceType": "AllergyIntolerance",
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#AllergyIntolerance-furn:uuid:964025cf-d0bb-4c0e-9287-966a2bb7f558"
            }
          ],
          "clinicalStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                "code": "active",
                "display": "Active"
              }
            ],
            "text": "Active"
          },
          "verificationStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
                "code": "confirmed",
                "display": "Confirmed"
              }
            ],
            "text": "Confirmed"
          },
          "category": [
            "food",
            "medication"
          ],
          "code": {
            "coding": [
              {
                "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
                "code": "891658",
                "display": "peanut allergenic extract"
              }
            ],
            "text": "peanut"
          },
          "patient": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "onsetDateTime": "2001-01-01",
          "recordedDate": "2021-03-28T14:51:14-04:00",
          "reaction": [
            {
              "manifestation": [
                {
                  "coding": [
                    {
                      "system": "http://snomed.info/sct",
                      "code": "39579001"
                    }
                  ]
                }
              ],
              "description": "anaphylaxis"
            }
          ]
        }
      },
      {
        "fullUrl": "urn:uuid:48ff3bd2-44ab-4796-9e68-f3fc0cdd0fd7",
        "resource": {
          "resourceType": "AllergyIntolerance",
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#AllergyIntolerance-furn:uuid:48ff3bd2-44ab-4796-9e68-f3fc0cdd0fd7"
            }
          ],
          "clinicalStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                "code": "active",
                "display": "Active"
              }
            ],
            "text": "Active"
          },
          "verificationStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
                "code": "confirmed",
                "display": "Confirmed"
              }
            ],
            "text": "Confirmed"
          },
          "category": [
            "medication"
          ],
          "code": {
            "coding": [
              {
                "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
                "code": "2670",
                "display": "codeine"
              }
            ],
            "text": "codeine"
          },
          "patient": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "recordedDate": "2021-03-28T14:51:14-04:00",
          "reaction": [
            {
              "manifestation": [
                {
                  "coding": [
                    {
                      "system": "http://snomed.info/sct",
                      "code": "418290006"
                    }
                  ]
                }
              ],
              "description": "itching"
            }
          ]
        }
      },
      {
        "fullUrl": "urn:uuid:8949dc7e-0836-4588-b092-a4e40ec27fc7",
        "resource": {
          "resourceType": "AllergyIntolerance",
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#AllergyIntolerance-furn:uuid:8949dc7e-0836-4588-b092-a4e40ec27fc7"
            }
          ],
          "clinicalStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                "code": "active",
                "display": "Active"
              }
            ],
            "text": "Active"
          },
          "verificationStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
                "code": "confirmed",
                "display": "Confirmed"
              }
            ],
            "text": "Confirmed"
          },
          "category": [
            "environment",
            "medication"
          ],
          "code": {
            "coding": [
              {
                "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
                "code": "1314891",
                "display": "latex"
              }
            ],
            "text": "latex"
          },
          "patient": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "recordedDate": "2021-03-28T14:51:14-04:00",
          "reaction": [
            {
              "manifestation": [
                {
                  "coding": [
                    {
                      "system": "http://snomed.info/sct",
                      "code": "271807003"
                    }
                  ]
                }
              ],
              "description": "rash"
            }
          ]
        }
      },
      {
        "fullUrl": "urn:uuid:d5651075-e7f4-41d1-ab0e-238c74c475c5",
        "resource": {
          "resourceType": "AllergyIntolerance",
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#AllergyIntolerance-furn:uuid:d5651075-e7f4-41d1-ab0e-238c74c475c5"
            }
          ],
          "clinicalStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                "code": "active",
                "display": "Active"
              }
            ],
            "text": "Active"
          },
          "verificationStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
                "code": "confirmed",
                "display": "Confirmed"
              }
            ],
            "text": "Confirmed"
          },
          "category": [
            "environment",
            "medication"
          ],
          "code": {
            "text": "tree and shrub pollen"
          },
          "patient": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "onsetDateTime": "2003-01-01",
          "recordedDate": "2021-03-28T14:51:14-04:00",
          "reaction": [
            {
              "manifestation": [
                {
                  "coding": [
                    {
                      "system": "http://snomed.info/sct",
                      "code": "75705005"
                    }
                  ]
                }
              ],
              "description": "eye redness"
            },
            {
              "manifestation": [
                {
                  "coding": [
                    {
                      "system": "http://snomed.info/sct",
                      "code": "418290006"
                    }
                  ]
                }
              ],
              "description": "itching"
            },
            {
              "manifestation": [
                {
                  "coding": [
                    {
                      "system": "http://snomed.info/sct",
                      "code": "74964007"
                    }
                  ]
                }
              ],
              "description": "other"
            }
          ]
        }
      },
      {
        "fullUrl": "urn:uuid:84e2b6a7-8e74-44c4-8707-5e7e347cd39f",
        "resource": {
          "resourceType": "AllergyIntolerance",
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#AllergyIntolerance-furn:uuid:84e2b6a7-8e74-44c4-8707-5e7e347cd39f"
            }
          ],
          "clinicalStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                "code": "active",
                "display": "Active"
              }
            ],
            "text": "Active"
          },
          "verificationStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
                "code": "confirmed",
                "display": "Confirmed"
              }
            ],
            "text": "Confirmed"
          },
          "category": [
            "food",
            "medication"
          ],
          "code": {
            "text": "shellfish derived"
          },
          "patient": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "onsetDateTime": "2002-01-01",
          "recordedDate": "2021-03-28T14:51:14-04:00",
          "reaction": [
            {
              "manifestation": [
                {
                  "coding": [
                    {
                      "system": "http://snomed.info/sct",
                      "code": "422400008"
                    }
                  ]
                }
              ],
              "description": "vomiting"
            }
          ]
        }
      },
      {
        "fullUrl": "urn:uuid:271bf0e3-1ddd-474d-8389-7416b325197f",
        "resource": {
          "resourceType": "MedicationStatement",
          "status": "unknown",
          "medicationCodeableConcept": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/uv/ips/CodeSystem/absent-unknown-uv-ips",
                "code": "no-medication-info",
                "display": "No information about medications"
              }
            ]
          },
          "subject": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          }
        }
      },
      {
        "fullUrl": "urn:uuid:57688c6d-ef85-4e4b-a4fc-25502c040c3e",
        "resource": {
          "resourceType": "Condition",
          "meta": {
            "lastUpdated": "2021-03-28T14:51:24.000-04:00",
            "profile": [
              "http://hl7.org/fhir/us/core/StructureDefinition/us-core-condition"
            ]
          },
          "extension": [
            {
              "url": "https://fhir.athena.io/StructureDefinition/ah-condition-problem-type-category",
              "valueCode": "90734009"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#Condition-furn:uuid:57688c6d-ef85-4e4b-a4fc-25502c040c3e"
            }
          ],
          "identifier": [
            {
              "value": "a-14523.Problem-161"
            }
          ],
          "clinicalStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                "code": "active",
                "display": "Active"
              }
            ],
            "text": "Active"
          },
          "verificationStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                "code": "confirmed",
                "display": "Confirmed"
              }
            ],
            "text": "Confirmed"
          },
          "category": [
            {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                  "code": "problem-list-item",
                  "display": "Problem List Item"
                }
              ],
              "text": "Problem List Item"
            }
          ],
          "code": {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "55822004",
                "display": "Hyperlipidemia"
              }
            ],
            "text": "Hyperlipidemia"
          },
          "subject": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "onsetDateTime": "2006-02-04",
          "recordedDate": "2021-03-28T14:51:24-04:00"
        }
      },
      {
        "fullUrl": "urn:uuid:56c44253-dde0-416c-a6a2-85d5ec6cf941",
        "resource": {
          "resourceType": "Condition",
          "meta": {
            "lastUpdated": "2021-03-28T14:51:24.000-04:00",
            "profile": [
              "http://hl7.org/fhir/us/core/StructureDefinition/us-core-condition"
            ]
          },
          "extension": [
            {
              "url": "https://fhir.athena.io/StructureDefinition/ah-condition-problem-type-category",
              "valueCode": "90734009"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#Condition-furn:uuid:56c44253-dde0-416c-a6a2-85d5ec6cf941"
            }
          ],
          "identifier": [
            {
              "value": "a-14523.Problem-162"
            }
          ],
          "clinicalStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                "code": "active",
                "display": "Active"
              }
            ],
            "text": "Active"
          },
          "verificationStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                "code": "confirmed",
                "display": "Confirmed"
              }
            ],
            "text": "Confirmed"
          },
          "category": [
            {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                  "code": "problem-list-item",
                  "display": "Problem List Item"
                }
              ],
              "text": "Problem List Item"
            }
          ],
          "code": {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "44054006",
                "display": "Type 2 diabetes mellitus"
              }
            ],
            "text": "Type 2 diabetes mellitus"
          },
          "subject": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "onsetDateTime": "2005-03-02",
          "recordedDate": "2021-03-28T14:51:24-04:00"
        }
      },
      {
        "fullUrl": "urn:uuid:b2f43163-67df-4309-9d76-b474dbc76e67",
        "resource": {
          "resourceType": "Condition",
          "meta": {
            "lastUpdated": "2021-03-28T14:51:24.000-04:00",
            "profile": [
              "http://hl7.org/fhir/us/core/StructureDefinition/us-core-condition"
            ]
          },
          "extension": [
            {
              "url": "https://fhir.athena.io/StructureDefinition/ah-condition-problem-type-category",
              "valueCode": "90734009"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#Condition-furn:uuid:b2f43163-67df-4309-9d76-b474dbc76e67"
            }
          ],
          "identifier": [
            {
              "value": "a-14523.Problem-163"
            }
          ],
          "clinicalStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                "code": "active",
                "display": "Active"
              }
            ],
            "text": "Active"
          },
          "verificationStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                "code": "confirmed",
                "display": "Confirmed"
              }
            ],
            "text": "Confirmed"
          },
          "category": [
            {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                  "code": "problem-list-item",
                  "display": "Problem List Item"
                }
              ],
              "text": "Problem List Item"
            }
          ],
          "code": {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "161501007",
                "display": "History of hypertension"
              }
            ],
            "text": "History of hypertension"
          },
          "subject": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "onsetDateTime": "2004-01-01",
          "recordedDate": "2021-03-28T14:51:24-04:00"
        }
      },
      {
        "fullUrl": "urn:uuid:e68513e1-4a6c-40b2-8299-9f969487b768",
        "resource": {
          "resourceType": "Condition",
          "meta": {
            "lastUpdated": "2021-03-28T15:02:27.000-04:00",
            "profile": [
              "http://hl7.org/fhir/us/core/StructureDefinition/us-core-condition"
            ]
          },
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#Condition-furn:uuid:e68513e1-4a6c-40b2-8299-9f969487b768"
            }
          ],
          "identifier": [
            {
              "value": "a-14523.EncounterDx-241"
            }
          ],
          "verificationStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                "code": "confirmed",
                "display": "Confirmed"
              }
            ],
            "text": "Confirmed"
          },
          "category": [
            {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                  "code": "encounter-diagnosis",
                  "display": "Encounter Diagnosis"
                }
              ],
              "text": "Encounter Diagnosis"
            }
          ],
          "code": {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "64766004",
                "display": "Ulcerative colitis"
              },
              {
                "system": "http://hl7.org/fhir/sid/icd-10-cm",
                "code": "K51.90",
                "display": "Ulcerative colitis, unspecified, without complications"
              }
            ],
            "text": "Ulcerative colitis"
          },
          "subject": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "recordedDate": "2021-03-28T15:02:20-04:00"
        }
      },
      {
        "fullUrl": "urn:uuid:e8843781-31dd-46bf-9c34-0e2b93d4121f",
        "resource": {
          "resourceType": "Condition",
          "meta": {
            "lastUpdated": "2021-03-28T15:04:04.000-04:00",
            "profile": [
              "http://hl7.org/fhir/us/core/StructureDefinition/us-core-condition"
            ]
          },
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#Condition-furn:uuid:e8843781-31dd-46bf-9c34-0e2b93d4121f"
            }
          ],
          "identifier": [
            {
              "value": "a-14523.EncounterDx-242"
            }
          ],
          "verificationStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                "code": "unconfirmed",
                "display": "Unconfirmed"
              }
            ],
            "text": "Unconfirmed"
          },
          "category": [
            {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                  "code": "encounter-diagnosis",
                  "display": "Encounter Diagnosis"
                }
              ],
              "text": "Encounter Diagnosis"
            }
          ],
          "code": {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "203082005",
                "display": "Fibromyalgia"
              },
              {
                "system": "http://hl7.org/fhir/sid/icd-10-cm",
                "code": "M79.7",
                "display": "Fibromyalgia"
              }
            ],
            "text": "Fibromyalgia"
          },
          "subject": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "recordedDate": "2021-03-28T15:04:04-04:00"
        }
      },
      {
        "fullUrl": "urn:uuid:65642db7-9a88-4b51-a24b-e21df608d6ed",
        "resource": {
          "resourceType": "Immunization",
          "meta": {
            "lastUpdated": "2021-05-13T11:45:23.000-04:00"
          },
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#Immunization-furn:uuid:65642db7-9a88-4b51-a24b-e21df608d6ed"
            }
          ],
          "identifier": [
            {
              "system": "https://fhir.athena.io/sid/ah-immunization",
              "value": "a-14523.historical-101"
            }
          ],
          "status": "completed",
          "vaccineCode": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/sid/cvx",
                "code": "207",
                "display": "COVID-19, mRNA, LNP-S, PF, 100 mcg/0.5mL dose or 50 mcg/0.25mL dose"
              },
              {
                "system": "http://hl7.org/fhir/sid/ndc",
                "code": "80777027315",
                "display": "MODERNA COVID (12Y UP)VAC(EUA)"
              }
            ],
            "text": "COVID-19, mRNA, LNP-S, PF, 100 mcg/0.5mL dose or 50 mcg/0.25mL dose"
          },
          "patient": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "occurrenceDateTime": "2021-04-21",
          "primarySource": false,
          "manufacturer": {
            "display": "Moderna US, Inc."
          },
          "lotNumber": "020B21A",
          "site": {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "368208006",
                "display": "Left upper arm structure"
              }
            ],
            "text": "Arm, Left Upper"
          },
          "route": {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "285837007",
                "display": "Injection into body site"
              }
            ],
            "text": "Injection"
          },
          "doseQuantity": {
            "value": 0.5,
            "unit": "mL"
          },
          "isSubpotent": false
        }
      },
      {
        "fullUrl": "urn:uuid:2659f180-87ca-422a-925f-877b73bda18a",
        "resource": {
          "resourceType": "Immunization",
          "meta": {
            "lastUpdated": "2021-05-13T11:46:24.000-04:00"
          },
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#Immunization-furn:uuid:2659f180-87ca-422a-925f-877b73bda18a"
            }
          ],
          "identifier": [
            {
              "system": "https://fhir.athena.io/sid/ah-immunization",
              "value": "a-14523.historical-102"
            }
          ],
          "status": "completed",
          "vaccineCode": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/sid/cvx",
                "code": "207",
                "display": "COVID-19, mRNA, LNP-S, PF, 100 mcg/0.5mL dose or 50 mcg/0.25mL dose"
              },
              {
                "system": "http://hl7.org/fhir/sid/ndc",
                "code": "80777027315",
                "display": "MODERNA COVID (12Y UP)VAC(EUA)"
              }
            ],
            "text": "COVID-19, mRNA, LNP-S, PF, 100 mcg/0.5mL dose or 50 mcg/0.25mL dose"
          },
          "patient": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "occurrenceDateTime": "2021-03-24",
          "primarySource": false,
          "manufacturer": {
            "display": "Moderna US, Inc."
          },
          "lotNumber": "045A21A",
          "site": {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "368209003",
                "display": "Right upper arm structure"
              }
            ],
            "text": "Arm, Right Upper"
          },
          "route": {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "285837007",
                "display": "Injection into body site"
              }
            ],
            "text": "Injection"
          },
          "doseQuantity": {
            "value": 0.5,
            "unit": "mL"
          },
          "isSubpotent": false
        }
      },
      {
        "fullUrl": "urn:uuid:f70589b5-3f18-480c-83a3-ed11787c4fd6",
        "resource": {
          "resourceType": "Immunization",
          "meta": {
            "lastUpdated": "2021-03-28T14:51:30.000-04:00"
          },
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#Immunization-furn:uuid:f70589b5-3f18-480c-83a3-ed11787c4fd6"
            }
          ],
          "identifier": [
            {
              "system": "https://fhir.athena.io/sid/ah-immunization",
              "value": "a-14523.historical-81"
            }
          ],
          "status": "completed",
          "vaccineCode": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/sid/cvx",
                "code": "150",
                "display": "influenza, injectable, quadrivalent, preservative free"
              }
            ],
            "text": "influenza, injectable, quadrivalent, preservative free"
          },
          "patient": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "occurrenceDateTime": "2017-10-06",
          "primarySource": false,
          "manufacturer": {
            "display": "Sanofi Pasteur"
          },
          "lotNumber": "wr123",
          "doseQuantity": {
            "value": 1,
            "unit": "mL"
          },
          "isSubpotent": false
        }
      },
      {
        "fullUrl": "urn:uuid:8380302e-cedb-406e-ab44-f24ab8adde03",
        "resource": {
          "resourceType": "Immunization",
          "meta": {
            "lastUpdated": "2021-03-28T14:51:30.000-04:00"
          },
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#Immunization-furn:uuid:8380302e-cedb-406e-ab44-f24ab8adde03"
            }
          ],
          "identifier": [
            {
              "system": "https://fhir.athena.io/sid/ah-immunization",
              "value": "a-14523.historical-82"
            }
          ],
          "status": "completed",
          "vaccineCode": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/sid/cvx",
                "code": "33",
                "display": "pneumococcal polysaccharide PPV23"
              }
            ],
            "text": "pneumococcal polysaccharide PPV23"
          },
          "patient": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "occurrenceDateTime": "2017-10-06",
          "primarySource": false,
          "manufacturer": {
            "display": "Merck and Co., Inc."
          },
          "lotNumber": "2173tgd",
          "doseQuantity": {
            "value": 0.5,
            "unit": "mL"
          },
          "isSubpotent": false
        }
      },
      {
        "fullUrl": "urn:uuid:5488917e-2fe6-4b77-9bee-613a218bf3da",
        "resource": {
          "resourceType": "Immunization",
          "meta": {
            "lastUpdated": "2021-03-28T14:51:30.000-04:00"
          },
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#Immunization-furn:uuid:5488917e-2fe6-4b77-9bee-613a218bf3da"
            }
          ],
          "identifier": [
            {
              "system": "https://fhir.athena.io/sid/ah-immunization",
              "value": "a-14523.historical-83"
            }
          ],
          "status": "completed",
          "vaccineCode": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/sid/cvx",
                "code": "113",
                "display": "Td (adult), 5 Lf tetanus toxoid, preservative free, adsorbed"
              }
            ],
            "text": "Td (adult), 5 Lf tetanus toxoid, preservative free, adsorbed"
          },
          "patient": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "occurrenceDateTime": "2017-10-05",
          "primarySource": false,
          "manufacturer": {
            "display": "Sanofi Pasteur"
          },
          "lotNumber": "123",
          "doseQuantity": {
            "value": 0.5,
            "unit": "mL"
          },
          "isSubpotent": false
        }
      },
      {
        "fullUrl": "urn:uuid:c3cc6191-7e48-46b0-862a-15407b488bf0",
        "resource": {
          "resourceType": "Procedure",
          "meta": {
            "profile": [
              "http://hl7.org/fhir/us/core/StructureDefinition/us-core-procedure"
            ]
          },
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#Procedure-furn:uuid:c3cc6191-7e48-46b0-862a-15407b488bf0"
            }
          ],
          "identifier": [
            {
              "system": "https://fhir.athena.io/sid/ah-procedure",
              "value": "a-14523.shb.2397.61"
            }
          ],
          "status": "completed",
          "code": {
            "coding": [
              {
                "system": "http://www.ama-assn.org/go/cpt",
                "code": "42820",
                "display": "REMOVE TONSILS AND ADENOIDS"
              }
            ],
            "text": "Remove tonsils and adenoids"
          },
          "subject": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "performedDateTime": "2014-12-14"
        }
      },
      {
        "fullUrl": "urn:uuid:2256847b-05ee-4ad4-8fd5-6a2be858f4ed",
        "resource": {
          "resourceType": "DiagnosticReport",
          "meta": {
            "lastUpdated": "2022-08-17T12:42:49.000Z"
          },
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#DiagnosticReport-furn:uuid:2256847b-05ee-4ad4-8fd5-6a2be858f4ed"
            }
          ],
          "status": "unknown",
          "category": [
            {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/v2-0074",
                  "code": "LAB",
                  "display": "Laboratory"
                }
              ]
            }
          ],
          "code": {
            "coding": [
              {
                "system": "http://loinc.org",
                "code": "58410-2",
                "display": "CBC panel - Blood by Automated count"
              }
            ],
            "text": "CBC"
          },
          "subject": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4"
          },
          "effectiveDateTime": "2021-03-28T18:53:07Z",
          "issued": "2021-03-28T18:53:07.000Z",
          "presentedForm": [
            {
              "contentType": "image/jpeg",
              "url": "Binary/a-14523.DR-doc.1754.up.1754.jpg"
            }
          ]
        }
      },
      {
        "fullUrl": "urn:uuid:11067a3c-3b2a-4979-99f6-7f028070e794",
        "resource": {
          "resourceType": "Observation",
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#Observation-furn:uuid:11067a3c-3b2a-4979-99f6-7f028070e794"
            }
          ],
          "identifier": [
            {
              "system": "https://fhir.athena.io/sid/ah-observation",
              "value": "a-14523.vitalamb-261"
            }
          ],
          "status": "final",
          "category": [
            {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                  "code": "vital-signs",
                  "display": "Vital Signs"
                }
              ],
              "text": "Clinical observations measure the body's basic functions such as blood pressure, heart rate, respiratory rate, height, weight, body mass index, head circumference, pulse oximetry, temperature, and body surface area."
            }
          ],
          "code": {
            "coding": [
              {
                "system": "http://loinc.org",
                "code": "8302-2",
                "display": "Body height"
              }
            ]
          },
          "subject": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4",
            "type": "Patient"
          },
          "effectiveDateTime": "2017-10-04",
          "valueQuantity": {
            "value": 177.8,
            "unit": "centimeter",
            "system": "http://unitsofmeasure.org",
            "code": "cm"
          }
        }
      },
      {
        "fullUrl": "urn:uuid:ca91ce71-1eff-4a79-a156-85908d8f392a",
        "resource": {
          "resourceType": "Observation",
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#Observation-furn:uuid:ca91ce71-1eff-4a79-a156-85908d8f392a"
            }
          ],
          "identifier": [
            {
              "system": "https://fhir.athena.io/sid/ah-observation",
              "value": "a-14523.vitalamb-265"
            }
          ],
          "status": "final",
          "category": [
            {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                  "code": "vital-signs",
                  "display": "Vital Signs"
                }
              ],
              "text": "Clinical observations measure the body's basic functions such as blood pressure, heart rate, respiratory rate, height, weight, body mass index, head circumference, pulse oximetry, temperature, and body surface area."
            }
          ],
          "code": {
            "coding": [
              {
                "system": "http://loinc.org",
                "code": "8867-4",
                "display": "Heart rate"
              }
            ]
          },
          "subject": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4",
            "type": "Patient"
          },
          "effectiveDateTime": "2017-10-04",
          "valueQuantity": {
            "value": 56,
            "unit": "Beats / minute",
            "system": "http://unitsofmeasure.org",
            "code": "/min"
          }
        }
      },
      {
        "fullUrl": "urn:uuid:ba3f26e0-d1a0-4b49-9030-335a21dfffe2",
        "resource": {
          "resourceType": "Observation",
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/narrativeLink",
              "valueUrl": "urn:uuid:890317a9-cc82-420a-bf26-abf7258d0cfe#Observation-furn:uuid:ba3f26e0-d1a0-4b49-9030-335a21dfffe2"
            }
          ],
          "identifier": [
            {
              "system": "https://fhir.athena.io/sid/ah-observation",
              "value": "a-14523.vitalamb-266"
            }
          ],
          "status": "final",
          "category": [
            {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                  "code": "vital-signs",
                  "display": "Vital Signs"
                }
              ],
              "text": "Clinical observations measure the body's basic functions such as blood pressure, heart rate, respiratory rate, height, weight, body mass index, head circumference, pulse oximetry, temperature, and body surface area."
            }
          ],
          "code": {
            "coding": [
              {
                "system": "http://loinc.org",
                "code": "39156-5",
                "display": "Body mass index (BMI)"
              }
            ]
          },
          "subject": {
            "reference": "urn:uuid:8f1b3a6a-b10c-406a-949c-22a28a69f3d4",
            "type": "Patient"
          },
          "effectiveDateTime": "2017-10-04",
          "valueQuantity": {
            "value": 25.1,
            "unit": "kilogram / (meter ^ 2)",
            "system": "http://unitsofmeasure.org",
            "code": "kg/m2"
          }
        }
      },
      {
        ....
```

