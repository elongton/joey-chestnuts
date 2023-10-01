const api_obj = {
  openapi: "3.0.3",
  info: {
    title: "weather.gov API",
    description: "weather.gov API",
    version: "1.11.1",
  },
  servers: [
    {
      url: "https://api.weather.gov",
      description: "Production server",
    },
  ],
  paths: {
    "/alerts": {
      get: {
        description: "Returns all alerts",
        operationId: "alerts_query",
        parameters: [
          {
            name: "active",
            in: "query",
            description:
              "List only active alerts (use /alerts/active endpoints instead)",
            deprecated: true,
            schema: {
              type: "boolean",
            },
          },
          {
            $ref: "#/components/parameters/QueryStartTime",
          },
          {
            $ref: "#/components/parameters/QueryEndTime",
          },
          {
            $ref: "#/components/parameters/AlertStatus",
          },
          {
            $ref: "#/components/parameters/AlertMessageType",
          },
          {
            $ref: "#/components/parameters/AlertEventName",
          },
          {
            $ref: "#/components/parameters/AlertCode",
          },
          {
            $ref: "#/components/parameters/AlertArea",
          },
          {
            $ref: "#/components/parameters/AlertPoint",
          },
          {
            $ref: "#/components/parameters/AlertRegion",
          },
          {
            $ref: "#/components/parameters/AlertRegionType",
          },
          {
            $ref: "#/components/parameters/AlertZone",
          },
          {
            $ref: "#/components/parameters/AlertUrgency",
          },
          {
            $ref: "#/components/parameters/AlertSeverity",
          },
          {
            $ref: "#/components/parameters/AlertCertainty",
          },
          {
            $ref: "#/components/parameters/Limit",
          },
          {
            $ref: "#/components/parameters/PaginationCursor",
          },
        ],
        responses: {
          "200": {
            $ref: "#/components/responses/AlertCollection",
          },
          "301": {
            description:
              "Certain common queries may be redirected to discrete URLs",
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
    },
    "/alerts/active": {
      get: {
        description: "Returns all currently active alerts",
        operationId: "alerts_active",
        parameters: [
          {
            $ref: "#/components/parameters/AlertStatus",
          },
          {
            $ref: "#/components/parameters/AlertMessageType",
          },
          {
            $ref: "#/components/parameters/AlertEventName",
          },
          {
            $ref: "#/components/parameters/AlertCode",
          },
          {
            $ref: "#/components/parameters/AlertArea",
          },
          {
            $ref: "#/components/parameters/AlertPoint",
          },
          {
            $ref: "#/components/parameters/AlertRegion",
          },
          {
            $ref: "#/components/parameters/AlertRegionType",
          },
          {
            $ref: "#/components/parameters/AlertZone",
          },
          {
            $ref: "#/components/parameters/AlertUrgency",
          },
          {
            $ref: "#/components/parameters/AlertSeverity",
          },
          {
            $ref: "#/components/parameters/AlertCertainty",
          },
          {
            $ref: "#/components/parameters/Limit",
          },
        ],
        responses: {
          "200": {
            $ref: "#/components/responses/AlertCollection",
          },
          "301": {
            description:
              "Certain common queries may be redirected to discrete URLs",
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
    },
    "/alerts/active/count": {
      get: {
        description: "Returns info on the number of active alerts",
        operationId: "alerts_active_count",
        responses: {
          "200": {
            description:
              "A data structure showing the counts of active alerts broken down by various categories",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {
                  type: "object",
                  properties: {
                    total: {
                      minimum: 0,
                      type: "integer",
                      description: "The total number of active alerts",
                    },
                    land: {
                      minimum: 0,
                      type: "integer",
                      description:
                        "The total number of active alerts affecting land zones",
                    },
                    marine: {
                      minimum: 0,
                      type: "integer",
                      description:
                        "The total number of active alerts affecting marine zones",
                    },
                    regions: {
                      type: "object",
                      description: "Active alerts by marine region",
                      additionalProperties: {
                        minimum: 1,
                        type: "integer",
                      },
                    },
                    areas: {
                      type: "object",
                      description: "Active alerts by area (state/territory)",
                      additionalProperties: {
                        minimum: 1,
                        type: "integer",
                      },
                    },
                    zones: {
                      type: "object",
                      description:
                        "Active alerts by NWS public zone or county code",
                      additionalProperties: {
                        minimum: 1,
                        type: "integer",
                      },
                    },
                  },
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
    },
    "/alerts/active/zone/{zoneId}": {
      get: {
        description:
          "Returns active alerts for the given NWS public zone or county",
        operationId: "alerts_active_zone",
        responses: {
          "200": {
            $ref: "#/components/responses/AlertCollection",
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          $ref: "#/components/parameters/NWSZoneId",
        },
      ],
    },
    "/alerts/active/area/{area}": {
      get: {
        description:
          "Returns active alerts for the given area (state or marine area)",
        operationId: "alerts_active_area",
        responses: {
          "200": {
            $ref: "#/components/responses/AlertCollection",
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          name: "area",
          in: "path",
          description: "State/area ID",
          required: true,
          schema: {
            $ref: "#/components/schemas/AreaCode",
          },
        },
      ],
    },
    "/alerts/active/region/{region}": {
      get: {
        description: "Returns active alerts for the given marine region",
        operationId: "alerts_active_region",
        responses: {
          "200": {
            $ref: "#/components/responses/AlertCollection",
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          name: "region",
          in: "path",
          description: "Marine region ID",
          required: true,
          schema: {
            $ref: "#/components/schemas/MarineRegionCode",
          },
        },
      ],
    },
    "/alerts/types": {
      get: {
        description: "Returns a list of alert types",
        operationId: "alerts_types",
        responses: {
          "200": {
            description: "A list of recognized event types",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {
                  type: "object",
                  properties: {
                    eventTypes: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                      description: "A list of recognized event types",
                    },
                  },
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
    },
    "/alerts/{id}": {
      get: {
        description: "Returns a specific alert",
        operationId: "alerts_single",
        responses: {
          "200": {
            description: "An alert record",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/geo+json": {
                schema: {
                  $ref: "#/components/schemas/AlertGeoJson",
                },
              },
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/AlertJsonLd",
                },
              },
              "application/cap+xml": {
                schema: {
                  $ref: "#/components/schemas/AlertCap",
                },
              },
            },
            "x-url-content-negotiation-extensions": {
              json: "application/geo+json",
              cap: "application/cap+xml",
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Alert identifier",
          required: true,
          schema: {
            $ref: "#/components/schemas/AlertId",
          },
        },
      ],
    },
    "/aviation/cwsus/{cwsuId}": {
      get: {
        description: "Returns metadata about a Center Weather Service Unit",
        operationId: "cwsu",
        parameters: [
          {
            $ref: "#/components/parameters/NWSCenterWeatherServiceUnitId",
          },
        ],
        responses: {
          "200": {
            description: "success",
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/CenterWeatherServiceUnitJsonLd",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
    },
    "/aviation/cwsus/{cwsuId}/cwas": {
      get: {
        description: "Returns a list of Center Weather Advisories from a CWSU",
        operationId: "cwas",
        parameters: [
          {
            $ref: "#/components/parameters/NWSCenterWeatherServiceUnitId",
          },
        ],
        responses: {
          "200": {
            description: "success",
            content: {
              "application/geo+json": {
                schema: {
                  $ref: "#/components/schemas/CenterWeatherAdvisoryCollectionGeoJson",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
    },
    "/aviation/cwsus/{cwsuId}/cwas/{date}/{sequence}": {
      get: {
        description: "Returns a list of Center Weather Advisories from a CWSU",
        operationId: "cwa",
        parameters: [
          {
            $ref: "#/components/parameters/NWSCenterWeatherServiceUnitId",
          },
          {
            $ref: "#/components/parameters/Date",
          },
          {
            name: "sequence",
            in: "path",
            description: "Sequence number",
            required: true,
            schema: {
              minimum: 100,
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "success",
            content: {
              "application/geo+json": {
                schema: {
                  $ref: "#/components/schemas/CenterWeatherAdvisoryGeoJson",
                },
              },
              "application/vnd.noaa.uswx+xml": {
                schema: {},
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
    },
    "/aviation/sigmets": {
      get: {
        description: "Returns a list of SIGMET/AIRMETs",
        operationId: "sigmetQuery",
        parameters: [
          {
            $ref: "#/components/parameters/QueryStartTime",
          },
          {
            $ref: "#/components/parameters/QueryEndTime",
          },
          {
            $ref: "#/components/parameters/QueryDate",
          },
          {
            name: "atsu",
            in: "query",
            description: "ATSU identifier",
            schema: {
              $ref: "#/components/schemas/ATSUIdentifier",
            },
          },
          {
            name: "sequence",
            in: "query",
            description: "SIGMET sequence number",
            schema: {
              $ref: "#/components/schemas/SigmetSequenceNumber",
            },
          },
        ],
        responses: {
          "200": {
            description: "success",
            content: {
              "application/geo+json": {
                schema: {
                  $ref: "#/components/schemas/SigmetCollectionGeoJson",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
    },
    "/aviation/sigmets/{atsu}": {
      get: {
        description: "Returns a list of SIGMET/AIRMETs for the specified ATSU",
        operationId: "sigmetsByATSU",
        parameters: [
          {
            $ref: "#/components/parameters/ATSUIdentifier",
          },
        ],
        responses: {
          "200": {
            description: "success",
            content: {
              "application/geo+json": {
                schema: {
                  $ref: "#/components/schemas/SigmetCollectionGeoJson",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
    },
    "/aviation/sigmets/{atsu}/{date}": {
      get: {
        description:
          "Returns a list of SIGMET/AIRMETs for the specified ATSU for the specified date",
        operationId: "sigmetsByATSUByDate",
        parameters: [
          {
            $ref: "#/components/parameters/ATSUIdentifier",
          },
          {
            $ref: "#/components/parameters/Date",
          },
        ],
        responses: {
          "200": {
            description: "success",
            content: {
              "application/geo+json": {
                schema: {
                  $ref: "#/components/schemas/SigmetCollectionGeoJson",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
    },
    "/aviation/sigmets/{atsu}/{date}/{time}": {
      get: {
        description: "Returns a specific SIGMET/AIRMET",
        operationId: "sigmet",
        parameters: [
          {
            $ref: "#/components/parameters/ATSUIdentifier",
          },
          {
            $ref: "#/components/parameters/Date",
          },
          {
            $ref: "#/components/parameters/Time",
          },
        ],
        responses: {
          "200": {
            description: "success",
            content: {
              "application/geo+json": {
                schema: {
                  $ref: "#/components/schemas/SigmetGeoJson",
                },
              },
              "application/vnd.noaa.uswx+xml": {
                schema: {},
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
    },
    "/glossary": {
      get: {
        description: "Returns glossary terms",
        operationId: "glossary",
        responses: {
          "200": {
            description: "A set of glossary terms",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {
                  type: "object",
                  properties: {
                    "@context": {
                      $ref: "#/components/schemas/JsonLdContext",
                    },
                    glossary: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          term: {
                            type: "string",
                            description: "The term being defined",
                          },
                          definition: {
                            type: "string",
                            description: "A definition for the term",
                          },
                        },
                      },
                      description: "A list of glossary terms",
                    },
                  },
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
    },
    "/gridpoints/{wfo}/{x},{y}": {
      get: {
        description:
          "Returns raw numerical forecast data for a 2.5km grid area",
        operationId: "gridpoint",
        parameters: [],
        responses: {
          "200": {
            description: "Gridpoint forecast data",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/geo+json": {
                schema: {
                  $ref: "#/components/schemas/GridpointGeoJson",
                },
              },
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/GridpointJsonLd",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
      parameters: [
        {
          $ref: "#/components/parameters/GridpointWFO",
        },
        {
          $ref: "#/components/parameters/GridpointX",
        },
        {
          $ref: "#/components/parameters/GridpointY",
        },
      ],
    },
    "/gridpoints/{wfo}/{x},{y}/forecast": {
      get: {
        description: "Returns a textual forecast for a 2.5km grid area",
        operationId: "gridpoint_forecast",
        parameters: [
          {
            $ref: "#/components/parameters/GridpointForecastFeatureFlags",
          },
          {
            $ref: "#/components/parameters/GridpointForecastUnits",
          },
        ],
        responses: {
          "200": {
            $ref: "#/components/responses/GridpointForecast",
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
      parameters: [
        {
          $ref: "#/components/parameters/GridpointWFO",
        },
        {
          $ref: "#/components/parameters/GridpointX",
        },
        {
          $ref: "#/components/parameters/GridpointY",
        },
      ],
    },
    "/gridpoints/{wfo}/{x},{y}/forecast/hourly": {
      get: {
        description: "Returns a textual hourly forecast for a 2.5km grid area",
        operationId: "gridpoint_forecast_hourly",
        parameters: [
          {
            $ref: "#/components/parameters/GridpointForecastFeatureFlags",
          },
          {
            $ref: "#/components/parameters/GridpointForecastUnits",
          },
        ],
        responses: {
          "200": {
            $ref: "#/components/responses/GridpointForecast",
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
      parameters: [
        {
          $ref: "#/components/parameters/GridpointWFO",
        },
        {
          $ref: "#/components/parameters/GridpointX",
        },
        {
          $ref: "#/components/parameters/GridpointY",
        },
      ],
    },
    "/gridpoints/{wfo}/{x},{y}/stations": {
      get: {
        description:
          "Returns a list of observation stations usable for a given 2.5km grid area",
        operationId: "gridpoint_stations",
        responses: {
          "200": {
            $ref: "#/components/responses/ObservationStationCollection",
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          $ref: "#/components/parameters/GridpointWFO",
        },
        {
          $ref: "#/components/parameters/GridpointX",
        },
        {
          $ref: "#/components/parameters/GridpointY",
        },
        {
          $ref: "#/components/parameters/Limit",
        },
        {
          $ref: "#/components/parameters/PaginationCursor",
        },
      ],
    },
    "/icons/{set}/{timeOfDay}/{first}": {
      get: {
        description:
          "Returns a forecast icon. Icon services in API are deprecated.",
        operationId: "icons",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "image/png": {
                schema: {
                  $ref: "#/components/schemas/BinaryFile",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        deprecated: true,
        parameters: [],
      },
      parameters: [
        {
          name: "set",
          in: "path",
          description: ".",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "timeOfDay",
          in: "path",
          description: ".",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "first",
          in: "path",
          description: ".",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "size",
          in: "query",
          description: "Font size",
          schema: {
            anyOf: [
              {
                enum: ["small", "medium", "large"],
                type: "string",
              },
              {
                maximum: 500,
                minimum: 10,
                type: "integer",
              },
            ],
          },
        },
        {
          name: "fontsize",
          in: "query",
          description: "Font size",
          schema: {
            maximum: 24,
            minimum: 2,
            type: "integer",
          },
        },
      ],
    },
    "/icons/{set}/{timeOfDay}/{first}/{second}": {
      get: {
        description:
          "Returns a forecast icon. Icon services in API are deprecated.",
        operationId: "iconsDualCondition",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "image/png": {
                schema: {
                  $ref: "#/components/schemas/BinaryFile",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        deprecated: true,
        parameters: [],
      },
      parameters: [
        {
          name: "set",
          in: "path",
          description: ".",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "timeOfDay",
          in: "path",
          description: ".",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "first",
          in: "path",
          description: ".",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "second",
          in: "path",
          description: ".",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "size",
          in: "query",
          description: "Font size",
          schema: {
            anyOf: [
              {
                enum: ["small", "medium", "large"],
                type: "string",
              },
              {
                maximum: 500,
                minimum: 10,
                type: "integer",
              },
            ],
          },
        },
        {
          name: "fontsize",
          in: "query",
          description: "Font size",
          schema: {
            maximum: 24,
            minimum: 2,
            type: "integer",
          },
        },
      ],
    },
    "/icons": {
      get: {
        description:
          "Returns a list of icon codes and textual descriptions. Icon services in API are deprecated.",
        operationId: "icons_summary",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {
                  required: ["icons"],
                  type: "object",
                  properties: {
                    "@context": {
                      $ref: "#/components/schemas/JsonLdContext",
                    },
                    icons: {
                      type: "object",
                      additionalProperties: {
                        required: ["description"],
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                        },
                        additionalProperties: false,
                      },
                    },
                  },
                  additionalProperties: false,
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        deprecated: true,
        parameters: [],
      },
    },
    "/thumbnails/satellite/{area}": {
      get: {
        description:
          "Returns a thumbnail image for a satellite region. Image services in API are deprecated.",
        operationId: "satellite_thumbnails",
        responses: {
          "200": {
            description: "An image file",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "image/jpeg": {
                schema: {
                  $ref: "#/components/schemas/BinaryFile",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        deprecated: true,
        parameters: [],
      },
      parameters: [
        {
          name: "area",
          in: "path",
          description: ".",
          required: true,
          schema: {
            enum: ["a", "e", "g", "h", "p", "s", "w"],
            type: "string",
          },
        },
      ],
    },
    "/stations/{stationId}/observations": {
      get: {
        description: "Returns a list of observations for a given station",
        operationId: "station_observation_list",
        parameters: [
          {
            $ref: "#/components/parameters/QueryStartTime",
          },
          {
            $ref: "#/components/parameters/QueryEndTime",
          },
          {
            name: "limit",
            in: "query",
            description: "Limit",
            schema: {
              maximum: 500,
              minimum: 1,
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            $ref: "#/components/responses/ObservationCollection",
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
      parameters: [
        {
          $ref: "#/components/parameters/ObservationStationId",
        },
      ],
    },
    "/stations/{stationId}/observations/latest": {
      get: {
        description: "Returns the latest observation for a station",
        operationId: "station_observation_latest",
        parameters: [
          {
            name: "require_qc",
            in: "query",
            description: "Require QC",
            schema: {
              type: "boolean",
            },
          },
        ],
        responses: {
          "200": {
            $ref: "#/components/responses/Observation",
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
      parameters: [
        {
          $ref: "#/components/parameters/ObservationStationId",
        },
      ],
    },
    "/stations/{stationId}/observations/{time}": {
      get: {
        description: "Returns a single observation.",
        operationId: "station_observation_time",
        parameters: [
          {
            name: "time",
            in: "path",
            description: "Timestamp of requested observation",
            required: true,
            schema: {
              type: "string",
              format: "date-time",
            },
          },
        ],
        responses: {
          "200": {
            $ref: "#/components/responses/Observation",
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
      parameters: [
        {
          $ref: "#/components/parameters/ObservationStationId",
        },
      ],
    },
    "/stations/{stationId}/tafs": {
      get: {
        description:
          "Returns Terminal Aerodrome Forecasts for the specified airport station.",
        operationId: "tafs",
        parameters: [
          {
            $ref: "#/components/parameters/ObservationStationId",
          },
        ],
        responses: {
          "200": {
            description: "success",
            content: {
              "application/ld+json": {
                schema: {},
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
    },
    "/stations/{stationId}/tafs/{date}/{time}": {
      get: {
        description: "Returns a single Terminal Aerodrome Forecast.",
        operationId: "taf",
        parameters: [
          {
            $ref: "#/components/parameters/ObservationStationId",
          },
          {
            $ref: "#/components/parameters/Date",
          },
          {
            $ref: "#/components/parameters/Time",
          },
        ],
        responses: {
          "200": {
            description: "success",
            content: {
              "application/vnd.wmo.iwxxm+xml": {
                schema: {},
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
    },
    "/stations": {
      get: {
        description: "Returns a list of observation stations.",
        operationId: "obs_stations",
        parameters: [
          {
            name: "id",
            in: "query",
            description: "Filter by observation station ID",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          {
            name: "state",
            in: "query",
            description: "Filter by state/marine area code",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/AreaCode",
              },
            },
          },
          {
            $ref: "#/components/parameters/Limit",
          },
          {
            $ref: "#/components/parameters/PaginationCursor",
          },
        ],
        responses: {
          "200": {
            $ref: "#/components/responses/ObservationStationCollection",
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
    },
    "/stations/{stationId}": {
      get: {
        description: "Returns metadata about a given observation station",
        operationId: "obs_station",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/geo+json": {
                schema: {
                  $ref: "#/components/schemas/ObservationStationGeoJson",
                },
              },
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/ObservationStationJsonLd",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          $ref: "#/components/parameters/ObservationStationId",
        },
      ],
    },
    "/offices/{officeId}": {
      get: {
        description: "Returns metadata about a NWS forecast office",
        operationId: "office",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/Office",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          $ref: "#/components/parameters/NWSOfficeId",
        },
      ],
    },
    "/offices/{officeId}/headlines/{headlineId}": {
      get: {
        description: "Returns a specific news headline for a given NWS office",
        operationId: "office_headline",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/OfficeHeadline",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          $ref: "#/components/parameters/NWSOfficeId",
        },
        {
          name: "headlineId",
          in: "path",
          description: "Headline record ID",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
    },
    "/offices/{officeId}/headlines": {
      get: {
        description: "Returns a list of news headlines for a given NWS office",
        operationId: "office_headlines",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/OfficeHeadlineCollection",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          $ref: "#/components/parameters/NWSOfficeId",
        },
      ],
    },
    "/points/{point}": {
      get: {
        description: "Returns metadata about a given latitude/longitude point",
        operationId: "point",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/geo+json": {
                schema: {
                  $ref: "#/components/schemas/PointGeoJson",
                },
              },
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/PointJsonLd",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          $ref: "#/components/parameters/PathPoint",
        },
      ],
    },
    "/points/{point}/stations": {
      get: {
        description: "Returns a list of observation stations for a given point",
        operationId: "point_stations",
        responses: {
          "301": {
            description: "redirect to gridpoint stations",
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        deprecated: true,
        parameters: [],
      },
      parameters: [
        {
          $ref: "#/components/parameters/PathPoint",
        },
      ],
    },
    "/radar/servers": {
      get: {
        description: "Returns a list of radar servers",
        operationId: "radar_servers",
        parameters: [
          {
            name: "reportingHost",
            in: "query",
            description: "Show records from specific reporting host",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {},
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
    },
    "/radar/servers/{id}": {
      get: {
        description: "Returns metadata about a given radar server",
        operationId: "radar_server",
        parameters: [
          {
            name: "reportingHost",
            in: "query",
            description: "Show records from specific reporting host",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {},
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Server ID",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
    },
    "/radar/stations": {
      get: {
        description: "Returns a list of radar stations",
        operationId: "radar_stations",
        parameters: [
          {
            name: "stationType",
            in: "query",
            description: "Limit results to a specific station type or types",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: {
                pattern: "^[A-Za-z0-9-]+$",
                type: "string",
              },
            },
          },
          {
            name: "reportingHost",
            in: "query",
            description:
              "Show RDA and latency info from specific reporting host",
            schema: {
              type: "string",
            },
          },
          {
            name: "host",
            in: "query",
            description: "Show latency info from specific LDM host",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/geo+json": {
                schema: {},
              },
              "application/ld+json": {
                schema: {},
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
    },
    "/radar/stations/{stationId}": {
      get: {
        description: "Returns metadata about a given radar station",
        operationId: "radar_station",
        parameters: [
          {
            name: "reportingHost",
            in: "query",
            description:
              "Show RDA and latency info from specific reporting host",
            schema: {
              type: "string",
            },
          },
          {
            name: "host",
            in: "query",
            description: "Show latency info from specific LDM host",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/geo+json": {
                schema: {},
              },
              "application/ld+json": {
                schema: {},
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
      parameters: [
        {
          name: "stationId",
          in: "path",
          description: "Radar station ID",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
    },
    "/radar/stations/{stationId}/alarms": {
      get: {
        description: "Returns metadata about a given radar station alarms",
        operationId: "radar_station_alarms",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {},
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          name: "stationId",
          in: "path",
          description: "Radar station ID",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
    },
    "/radar/queues/{host}": {
      get: {
        description: "Returns metadata about a given radar queue",
        operationId: "radar_queue",
        parameters: [
          {
            name: "limit",
            in: "query",
            description: "Record limit",
            schema: {
              maximum: 500,
              minimum: 1,
              type: "integer",
            },
          },
          {
            name: "arrived",
            in: "query",
            description: "Range for arrival time",
            schema: {
              $ref: "#/components/schemas/ISO8601Interval",
            },
          },
          {
            name: "created",
            in: "query",
            description: "Range for creation time",
            schema: {
              $ref: "#/components/schemas/ISO8601Interval",
            },
          },
          {
            name: "published",
            in: "query",
            description: "Range for publish time",
            schema: {
              $ref: "#/components/schemas/ISO8601Interval",
            },
          },
          {
            name: "station",
            in: "query",
            description: "Station identifier",
            schema: {
              type: "string",
            },
          },
          {
            name: "type",
            in: "query",
            description: "Record type",
            schema: {
              type: "string",
            },
          },
          {
            name: "feed",
            in: "query",
            description: "Originating product feed",
            schema: {
              type: "string",
            },
          },
          {
            name: "resolution",
            in: "query",
            description: "Resolution version",
            schema: {
              minimum: 1,
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {},
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
      parameters: [
        {
          name: "host",
          in: "path",
          description: "LDM host",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
    },
    "/radar/profilers/{stationId}": {
      get: {
        description: "Returns metadata about a given radar wind profiler",
        operationId: "radar_profiler",
        parameters: [
          {
            name: "time",
            in: "query",
            description: "Time interval",
            schema: {
              $ref: "#/components/schemas/ISO8601Interval",
            },
          },
          {
            name: "interval",
            in: "query",
            description: "Averaging interval",
            schema: {
              $ref: "#/components/schemas/ISO8601Duration",
            },
          },
        ],
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {},
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
      parameters: [
        {
          name: "stationId",
          in: "path",
          description: "Profiler station ID",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
    },
    "/products": {
      get: {
        description: "Returns a list of text products",
        operationId: "products_query",
        parameters: [
          {
            name: "location",
            in: "query",
            description: "Location id",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          {
            name: "start",
            in: "query",
            description: "Start time",
            schema: {
              type: "string",
              format: "date-time",
            },
          },
          {
            name: "end",
            in: "query",
            description: "End time",
            schema: {
              type: "string",
              format: "date-time",
            },
          },
          {
            name: "office",
            in: "query",
            description: "Issuing office",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: {
                pattern: "^[A-Z]{4}$",
                type: "string",
              },
            },
          },
          {
            name: "wmoid",
            in: "query",
            description: "WMO id code",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: {
                pattern: "^[A-Z]{4}\\d{2}$",
                type: "string",
              },
            },
          },
          {
            name: "type",
            in: "query",
            description: "Product code",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: {
                pattern: "^\\w{3}$",
                type: "string",
              },
            },
          },
          {
            name: "limit",
            in: "query",
            description: "Limit",
            schema: {
              maximum: 500,
              minimum: 1,
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/TextProductCollection",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
    },
    "/products/locations": {
      get: {
        description: "Returns a list of valid text product issuance locations",
        operationId: "product_locations",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/TextProductLocationCollection",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
    },
    "/products/types": {
      get: {
        description: "Returns a list of valid text product types and codes",
        operationId: "product_types",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/TextProductTypeCollection",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
    },
    "/products/{productId}": {
      get: {
        description: "Returns a specific text product",
        operationId: "product",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/TextProduct",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          name: "productId",
          in: "path",
          description: ".",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
    },
    "/products/types/{typeId}": {
      get: {
        description: "Returns a list of text products of a given type",
        operationId: "products_type",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/TextProductCollection",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          name: "typeId",
          in: "path",
          description: ".",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
    },
    "/products/types/{typeId}/locations": {
      get: {
        description:
          "Returns a list of valid text product issuance locations for a given product type",
        operationId: "products_type_locations",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/TextProductLocationCollection",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          name: "typeId",
          in: "path",
          description: ".",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
    },
    "/products/locations/{locationId}/types": {
      get: {
        description:
          "Returns a list of valid text product types for a given issuance location",
        operationId: "location_products",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/TextProductTypeCollection",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          name: "locationId",
          in: "path",
          description: ".",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
    },
    "/products/types/{typeId}/locations/{locationId}": {
      get: {
        description:
          "Returns a list of text products of a given type for a given issuance location",
        operationId: "products_type_location",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/TextProductCollection",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          name: "typeId",
          in: "path",
          description: ".",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "locationId",
          in: "path",
          description: ".",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
    },
    "/zones": {
      get: {
        description: "Returns a list of zones",
        operationId: "zone_list",
        parameters: [
          {
            name: "id",
            in: "query",
            description: "Zone ID (forecast or county)",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/NWSZoneID",
              },
            },
          },
          {
            name: "area",
            in: "query",
            description: "State/marine area code",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/AreaCode",
              },
            },
          },
          {
            name: "region",
            in: "query",
            description: "Region code",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/RegionCode",
              },
            },
          },
          {
            name: "type",
            in: "query",
            description: "Zone type",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/NWSZoneType",
              },
            },
          },
          {
            name: "point",
            in: "query",
            description: "Point (latitude,longitude)",
            schema: {
              $ref: "#/components/schemas/PointString",
            },
          },
          {
            name: "include_geometry",
            in: "query",
            description: "Include geometry in results (true/false)",
            schema: {
              type: "boolean",
            },
          },
          {
            name: "limit",
            in: "query",
            description: "Limit",
            schema: {
              minimum: 1,
              type: "integer",
            },
          },
          {
            name: "effective",
            in: "query",
            description: "Effective date/time",
            schema: {
              type: "string",
              format: "date-time",
            },
          },
        ],
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/geo+json": {
                schema: {
                  $ref: "#/components/schemas/ZoneCollectionGeoJson",
                },
              },
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/ZoneCollectionJsonLd",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
    },
    "/zones/{type}": {
      get: {
        description: "Returns a list of zones of a given type",
        operationId: "zone_list_type",
        parameters: [
          {
            name: "id",
            in: "query",
            description: "Zone ID (forecast or county)",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/NWSZoneID",
              },
            },
          },
          {
            name: "area",
            in: "query",
            description: "State/marine area code",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/AreaCode",
              },
            },
          },
          {
            name: "region",
            in: "query",
            description: "Region code",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/RegionCode",
              },
            },
          },
          {
            name: "type",
            in: "query",
            description: "Zone type",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/NWSZoneType",
              },
            },
          },
          {
            name: "point",
            in: "query",
            description: "Point (latitude,longitude)",
            schema: {
              $ref: "#/components/schemas/PointString",
            },
          },
          {
            name: "include_geometry",
            in: "query",
            description: "Include geometry in results (true/false)",
            schema: {
              type: "boolean",
            },
          },
          {
            name: "limit",
            in: "query",
            description: "Limit",
            schema: {
              minimum: 1,
              type: "integer",
            },
          },
          {
            name: "effective",
            in: "query",
            description: "Effective date/time",
            schema: {
              type: "string",
              format: "date-time",
            },
          },
        ],
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/geo+json": {
                schema: {
                  $ref: "#/components/schemas/ZoneCollectionGeoJson",
                },
              },
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/ZoneCollectionJsonLd",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
      parameters: [
        {
          name: "type",
          in: "path",
          description: "Zone type",
          required: true,
          schema: {
            $ref: "#/components/schemas/NWSZoneType",
          },
        },
      ],
    },
    "/zones/{type}/{zoneId}": {
      get: {
        description: "Returns metadata about a given zone",
        operationId: "zone",
        parameters: [
          {
            name: "effective",
            in: "query",
            description: "Effective date/time",
            schema: {
              type: "string",
              format: "date-time",
            },
          },
        ],
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/geo+json": {
                schema: {
                  $ref: "#/components/schemas/ZoneGeoJson",
                },
              },
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/ZoneJsonLd",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
      parameters: [
        {
          name: "type",
          in: "path",
          description: "Zone type",
          required: true,
          schema: {
            $ref: "#/components/schemas/NWSZoneType",
          },
        },
        {
          $ref: "#/components/parameters/NWSZoneId",
        },
      ],
    },
    "/zones/{type}/{zoneId}/forecast": {
      get: {
        description: "Returns the current zone forecast for a given zone",
        operationId: "zone_forecast",
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/geo+json": {
                schema: {
                  $ref: "#/components/schemas/ZoneForecastGeoJson",
                },
              },
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/ZoneForecastJsonLd",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          name: "type",
          in: "path",
          description: "Zone type",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          $ref: "#/components/parameters/NWSZoneId",
        },
      ],
    },
    "/zones/forecast/{zoneId}/observations": {
      get: {
        description: "Returns a list of observations for a given zone",
        operationId: "zone_obs",
        parameters: [
          {
            name: "start",
            in: "query",
            description: "Start date/time",
            schema: {
              type: "string",
              format: "date-time",
            },
          },
          {
            name: "end",
            in: "query",
            description: "End date/time",
            schema: {
              type: "string",
              format: "date-time",
            },
          },
          {
            name: "limit",
            in: "query",
            description: "Limit",
            schema: {
              maximum: 500,
              minimum: 1,
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "success",
            headers: {
              "X-Correlation-Id": {
                $ref: "#/components/headers/CorrelationId",
              },
              "X-Request-Id": {
                $ref: "#/components/headers/RequestId",
              },
              "X-Server-Id": {
                $ref: "#/components/headers/ServerId",
              },
            },
            content: {
              "application/geo+json": {
                schema: {
                  $ref: "#/components/schemas/ObservationCollectionGeoJson",
                },
              },
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/ObservationCollectionJsonLd",
                },
              },
            },
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
      },
      parameters: [
        {
          $ref: "#/components/parameters/NWSZoneId",
        },
      ],
    },
    "/zones/forecast/{zoneId}/stations": {
      get: {
        description: "Returns a list of observation stations for a given zone",
        operationId: "zone_stations",
        responses: {
          "200": {
            $ref: "#/components/responses/ObservationStationCollection",
          },
          default: {
            $ref: "#/components/responses/Error",
          },
        },
        parameters: [],
      },
      parameters: [
        {
          $ref: "#/components/parameters/NWSZoneId",
        },
        {
          $ref: "#/components/parameters/Limit",
        },
        {
          $ref: "#/components/parameters/PaginationCursor",
        },
      ],
    },
  },
  components: {
    schemas: {
      Alert: {
        type: "object",
        properties: {
          id: {
            $ref: "#/components/schemas/AlertId",
          },
          areaDesc: {
            type: "string",
            description:
              "A textual description of the area affected by the alert.",
          },
          geocode: {
            type: "object",
            properties: {
              UGC: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/NWSZoneID",
                },
                description: "A list of NWS public zone or county identifiers.",
              },
              SAME: {
                type: "array",
                items: {
                  pattern: "^\\d{6}$",
                  type: "string",
                },
                description:
                  "A list of SAME (Specific Area Message Encoding) codes for affected counties.",
              },
            },
            description:
              "Lists of codes for NWS public zones and counties affected by the alert.",
          },
          affectedZones: {
            type: "array",
            items: {
              type: "string",
              format: "uri",
            },
            description:
              "An array of API links for zones affected by the alert. This is an API-specific extension field and is not part of the CAP specification.\n",
          },
          references: {
            type: "array",
            items: {
              type: "object",
              properties: {
                "@id": {
                  type: "string",
                  description: "An API link to the prior alert.",
                  format: "uri",
                },
                identifier: {
                  $ref: "#/components/schemas/AlertId",
                },
                sender: {
                  type: "string",
                  description: "The sender of the prior alert.",
                },
                sent: {
                  type: "string",
                  description: "The time the prior alert was sent.",
                  format: "date-time",
                },
              },
            },
            description:
              "A list of prior alerts that this alert updates or replaces.",
          },
          sent: {
            type: "string",
            description: "The time of the origination of the alert message.",
            format: "date-time",
          },
          effective: {
            type: "string",
            description:
              "The effective time of the information of the alert message.",
            format: "date-time",
          },
          onset: {
            type: "string",
            description:
              "The expected time of the beginning of the subject event of the alert message.",
            format: "date-time",
            nullable: true,
          },
          expires: {
            type: "string",
            description:
              "The expiry time of the information of the alert message.",
            format: "date-time",
          },
          ends: {
            type: "string",
            description:
              "The expected end time of the subject event of the alert message.",
            format: "date-time",
            nullable: true,
          },
          status: {
            $ref: "#/components/schemas/AlertStatus",
          },
          messageType: {
            $ref: "#/components/schemas/AlertMessageType",
          },
          category: {
            enum: [
              "Met",
              "Geo",
              "Safety",
              "Security",
              "Rescue",
              "Fire",
              "Health",
              "Env",
              "Transport",
              "Infra",
              "CBRNE",
              "Other",
            ],
            type: "string",
            description:
              "The code denoting the category of the subject event of the alert message.",
          },
          severity: {
            $ref: "#/components/schemas/AlertSeverity",
          },
          certainty: {
            $ref: "#/components/schemas/AlertCertainty",
          },
          urgency: {
            $ref: "#/components/schemas/AlertUrgency",
          },
          event: {
            type: "string",
            description:
              "The text denoting the type of the subject event of the alert message.",
          },
          sender: {
            type: "string",
            description: "Email address of the NWS webmaster.",
          },
          senderName: {
            type: "string",
            description: "The text naming the originator of the alert message.",
          },
          headline: {
            type: "string",
            description: "The text headline of the alert message.",
            nullable: true,
          },
          description: {
            type: "string",
            description:
              "The text describing the subject event of the alert message.",
          },
          instruction: {
            type: "string",
            description:
              "The text describing the recommended action to be taken by recipients of the alert message.\n",
            nullable: true,
          },
          response: {
            enum: [
              "Shelter",
              "Evacuate",
              "Prepare",
              "Execute",
              "Avoid",
              "Monitor",
              "Assess",
              "AllClear",
              "None",
            ],
            type: "string",
            description:
              "The code denoting the type of action recommended for the target audience.\nThis corresponds to responseType in the CAP specification.\n",
          },
          parameters: {
            type: "object",
            description:
              "System-specific additional parameters associated with the alert message.\nThe keys in this object correspond to parameter definitions in the NWS CAP specification.\n",
            additionalProperties: {
              type: "array",
              items: {},
            },
          },
        },
        description:
          "An object representing a public alert message.\nUnless otherwise noted, the fields in this object correspond to the National Weather Service CAP v1.2 specification, which extends the OASIS Common Alerting Protocol (CAP) v1.2 specification and USA Integrated Public Alert and Warning System (IPAWS) Profile v1.0. Refer to this documentation for more complete information.\nhttp://docs.oasis-open.org/emergency/cap/v1.2/CAP-v1.2-os.html http://docs.oasis-open.org/emergency/cap/v1.2/ipaws-profile/v1.0/cs01/cap-v1.2-ipaws-profile-cs01.html https://alerts.weather.gov/#technical-notes-v12\n",
      },
      AlertCollection: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "A title describing the alert collection",
          },
          updated: {
            type: "string",
            description: "The last time a change occurred to this collection",
            format: "date-time",
          },
          pagination: {
            $ref: "#/components/schemas/PaginationInfo",
          },
        },
      },
      AlertCollectionGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeatureCollection",
          },
          {
            type: "object",
            properties: {
              features: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      $ref: "#/components/schemas/Alert",
                    },
                  },
                },
              },
            },
          },
          {
            $ref: "#/components/schemas/AlertCollection",
          },
        ],
      },
      AlertCollectionJsonLd: {
        allOf: [
          {
            $ref: "#/components/schemas/AlertCollection",
          },
          {
            type: "object",
            properties: {
              "@context": {
                $ref: "#/components/schemas/JsonLdContext",
              },
              "@graph": {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Alert",
                },
              },
            },
          },
        ],
      },
      AlertCap: {
        type: "object",
      },
      AlertGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeature",
          },
          {
            type: "object",
            properties: {
              properties: {
                $ref: "#/components/schemas/Alert",
              },
            },
          },
        ],
      },
      AlertJsonLd: {
        type: "object",
        properties: {
          "@graph": {
            type: "array",
            items: {
              $ref: "#/components/schemas/Alert",
            },
          },
        },
      },
      AlertId: {
        type: "string",
        description: "The identifier of the alert message.",
      },
      AlertCertainty: {
        enum: ["Observed", "Likely", "Possible", "Unlikely", "Unknown"],
        type: "string",
      },
      AlertMessageType: {
        enum: ["Alert", "Update", "Cancel", "Ack", "Error"],
        type: "string",
      },
      AlertSeverity: {
        enum: ["Extreme", "Severe", "Moderate", "Minor", "Unknown"],
        type: "string",
      },
      AlertStatus: {
        enum: ["Actual", "Exercise", "System", "Test", "Draft"],
        type: "string",
      },
      AlertUrgency: {
        enum: ["Immediate", "Expected", "Future", "Past", "Unknown"],
        type: "string",
      },
      AlertAtomEntry: {
        type: "object",
        properties: {
          id: {
            type: "string",
            xml: {
              namespace: "http://www.w3.org/2005/Atom",
            },
          },
          updated: {
            type: "string",
            xml: {
              namespace: "http://www.w3.org/2005/Atom",
            },
          },
          published: {
            type: "string",
            xml: {
              namespace: "http://www.w3.org/2005/Atom",
            },
          },
          author: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
            },
            xml: {
              namespace: "http://www.w3.org/2005/Atom",
            },
          },
          summary: {
            type: "string",
            xml: {
              namespace: "http://www.w3.org/2005/Atom",
            },
          },
          event: {
            type: "string",
            xml: {
              namespace: "urn:oasis:names:tc:emergency:cap:1.2",
            },
          },
          sent: {
            type: "string",
            xml: {
              namespace: "urn:oasis:names:tc:emergency:cap:1.2",
            },
          },
          effective: {
            type: "string",
            xml: {
              namespace: "urn:oasis:names:tc:emergency:cap:1.2",
            },
          },
          expires: {
            type: "string",
            xml: {
              namespace: "urn:oasis:names:tc:emergency:cap:1.2",
            },
          },
          status: {
            type: "string",
            xml: {
              namespace: "urn:oasis:names:tc:emergency:cap:1.2",
            },
          },
          msgType: {
            type: "string",
            xml: {
              namespace: "urn:oasis:names:tc:emergency:cap:1.2",
            },
          },
          category: {
            type: "string",
            xml: {
              namespace: "urn:oasis:names:tc:emergency:cap:1.2",
            },
          },
          urgency: {
            type: "string",
            xml: {
              namespace: "urn:oasis:names:tc:emergency:cap:1.2",
            },
          },
          severity: {
            type: "string",
            xml: {
              namespace: "urn:oasis:names:tc:emergency:cap:1.2",
            },
          },
          certainty: {
            type: "string",
            xml: {
              namespace: "urn:oasis:names:tc:emergency:cap:1.2",
            },
          },
          areaDesc: {
            type: "string",
            xml: {
              namespace: "urn:oasis:names:tc:emergency:cap:1.2",
            },
          },
          polygon: {
            type: "string",
            xml: {
              namespace: "urn:oasis:names:tc:emergency:cap:1.2",
            },
          },
          geocode: {
            type: "array",
            items: {
              $ref: "#/components/schemas/AlertXMLParameter",
            },
            xml: {
              namespace: "urn:oasis:names:tc:emergency:cap:1.2",
            },
          },
          parameter: {
            type: "array",
            items: {
              $ref: "#/components/schemas/AlertXMLParameter",
            },
            xml: {
              namespace: "urn:oasis:names:tc:emergency:cap:1.2",
            },
          },
        },
        description: "An alert entry in an Atom feed",
        xml: {
          name: "entry",
          namespace: "http://www.w3.org/2005/Atom",
        },
      },
      AlertXMLParameter: {
        type: "object",
        properties: {
          valueName: {
            type: "string",
          },
          value: {
            type: "string",
          },
        },
      },
      AlertAtomFeed: {
        type: "object",
        properties: {
          id: {
            type: "string",
            xml: {
              namespace: "http://www.w3.org/2005/Atom",
            },
          },
          generator: {
            type: "string",
            xml: {
              namespace: "http://www.w3.org/2005/Atom",
            },
          },
          updated: {
            type: "string",
            xml: {
              namespace: "http://www.w3.org/2005/Atom",
            },
          },
          author: {
            type: "object",
            properties: {
              name: {
                type: "string",
                xml: {
                  namespace: "http://www.w3.org/2005/Atom",
                },
              },
            },
            xml: {
              namespace: "http://www.w3.org/2005/Atom",
            },
          },
          title: {
            type: "string",
            xml: {
              namespace: "http://www.w3.org/2005/Atom",
            },
          },
          entry: {
            type: "array",
            items: {
              $ref: "#/components/schemas/AlertAtomEntry",
            },
            xml: {
              namespace: "http://www.w3.org/2005/Atom",
            },
          },
        },
        description: "An alert feed in Atom format",
        xml: {
          name: "feed",
          namespace: "http://www.w3.org/2005/Atom",
        },
      },
      AreaCode: {
        oneOf: [
          {
            $ref: "#/components/schemas/StateTerritoryCode",
          },
          {
            $ref: "#/components/schemas/MarineAreaCode",
          },
        ],
        description: "State/territory codes and marine area codes",
      },
      ATSUIdentifier: {
        pattern: "^[A-Z]{3,4}$",
        type: "string",
        description: "ATSU Identifier",
      },
      BinaryFile: {
        type: "string",
        format: "binary",
      },
      CenterWeatherAdvisoryCollectionGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeatureCollection",
          },
          {
            type: "object",
            properties: {
              features: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      $ref: "#/components/schemas/CenterWeatherAdvisory",
                    },
                  },
                },
              },
            },
          },
        ],
      },
      CenterWeatherAdvisoryGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeature",
          },
          {
            type: "object",
            properties: {
              properties: {
                $ref: "#/components/schemas/CenterWeatherAdvisory",
              },
            },
          },
        ],
      },
      CenterWeatherAdvisory: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          issueTime: {
            type: "string",
            format: "date-time",
          },
          cwsu: {
            $ref: "#/components/schemas/NWSCenterWeatherServiceUnitId",
          },
          sequence: {
            minimum: 101,
            type: "integer",
          },
          start: {
            type: "string",
            format: "date-time",
          },
          end: {
            type: "string",
            format: "date-time",
          },
          observedProperty: {
            type: "string",
          },
          text: {
            type: "string",
          },
        },
        additionalProperties: false,
      },
      CenterWeatherServiceUnitJsonLd: {
        $ref: "#/components/schemas/Office",
      },
      Date: {
        type: "string",
        description: "Date (in YYYY-MM-DD format).",
        format: "date",
      },
      GeometryString: {
        type: "string",
        description: "A geometry represented in Well-Known Text (WKT) format.",
        format: "wkt",
        nullable: true,
      },
      GeoJsonBoundingBox: {
        minItems: 4,
        type: "array",
        items: {
          type: "number",
        },
        description:
          "A GeoJSON bounding box. Please refer to IETF RFC 7946 for information on the GeoJSON format.",
      },
      GeoJsonCoordinate: {
        minItems: 2,
        type: "array",
        items: {
          type: "number",
        },
        description:
          "A GeoJSON coordinate. Please refer to IETF RFC 7946 for information on the GeoJSON format.",
      },
      GeoJsonGeometry: {
        oneOf: [
          {
            title: "GeoJSON Point",
            required: ["type", "coordinates"],
            type: "object",
            properties: {
              type: {
                enum: ["Point"],
                type: "string",
              },
              coordinates: {
                $ref: "#/components/schemas/GeoJsonCoordinate",
              },
              bbox: {
                $ref: "#/components/schemas/GeoJsonBoundingBox",
              },
            },
          },
          {
            title: "GeoJSON LineString",
            required: ["type", "coordinates"],
            type: "object",
            properties: {
              type: {
                enum: ["LineString"],
                type: "string",
              },
              coordinates: {
                $ref: "#/components/schemas/GeoJsonLineString",
              },
              bbox: {
                $ref: "#/components/schemas/GeoJsonBoundingBox",
              },
            },
          },
          {
            title: "GeoJSON Polygon",
            required: ["type", "coordinates"],
            type: "object",
            properties: {
              type: {
                enum: ["Polygon"],
                type: "string",
              },
              coordinates: {
                $ref: "#/components/schemas/GeoJsonPolygon",
              },
              bbox: {
                $ref: "#/components/schemas/GeoJsonBoundingBox",
              },
            },
          },
          {
            title: "GeoJSON MultiPoint",
            required: ["type", "coordinates"],
            type: "object",
            properties: {
              type: {
                enum: ["MultiPoint"],
                type: "string",
              },
              coordinates: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/GeoJsonCoordinate",
                },
              },
              bbox: {
                $ref: "#/components/schemas/GeoJsonBoundingBox",
              },
            },
          },
          {
            title: "GeoJSON MultiLineString",
            required: ["type", "coordinates"],
            type: "object",
            properties: {
              type: {
                enum: ["MultiLineString"],
                type: "string",
              },
              coordinates: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/GeoJsonLineString",
                },
              },
              bbox: {
                $ref: "#/components/schemas/GeoJsonBoundingBox",
              },
            },
          },
          {
            title: "GeoJSON MultiPolygon",
            required: ["type", "coordinates"],
            type: "object",
            properties: {
              type: {
                enum: ["MultiPolygon"],
                type: "string",
              },
              coordinates: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/GeoJsonPolygon",
                },
              },
              bbox: {
                $ref: "#/components/schemas/GeoJsonBoundingBox",
              },
            },
          },
        ],
        description:
          "A GeoJSON geometry object. Please refer to IETF RFC 7946 for information on the GeoJSON format.",
        nullable: true,
      },
      GeoJsonFeature: {
        required: ["type", "geometry", "properties"],
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          id: {
            type: "string",
            format: "uri",
          },
          type: {
            enum: ["Feature"],
            type: "string",
          },
          geometry: {
            $ref: "#/components/schemas/GeoJsonGeometry",
          },
          properties: {
            type: "object",
          },
        },
        description:
          "A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format.",
        additionalProperties: false,
      },
      GeoJsonFeatureCollection: {
        required: ["type", "features"],
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          type: {
            enum: ["FeatureCollection"],
            type: "string",
          },
          features: {
            type: "array",
            items: {
              $ref: "#/components/schemas/GeoJsonFeature",
            },
          },
        },
        description:
          "A GeoJSON feature collection. Please refer to IETF RFC 7946 for information on the GeoJSON format.",
      },
      GeoJsonLineString: {
        minItems: 2,
        type: "array",
        items: {
          $ref: "#/components/schemas/GeoJsonCoordinate",
        },
        description:
          "A GeoJSON line string. Please refer to IETF RFC 7946 for information on the GeoJSON format.",
      },
      GeoJsonPolygon: {
        type: "array",
        items: {
          minItems: 4,
          type: "array",
          items: {
            $ref: "#/components/schemas/GeoJsonCoordinate",
          },
        },
        description:
          "A GeoJSON polygon. Please refer to IETF RFC 7946 for information on the GeoJSON format.",
      },
      Gridpoint: {
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          geometry: {
            $ref: "#/components/schemas/GeometryString",
          },
          "@id": {
            type: "string",
            format: "uri",
          },
          "@type": {
            enum: ["wx:Gridpoint"],
            type: "string",
          },
          updateTime: {
            type: "string",
            format: "date-time",
          },
          validTimes: {
            $ref: "#/components/schemas/ISO8601Interval",
          },
          elevation: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          forecastOffice: {
            type: "string",
            format: "uri",
          },
          gridId: {
            type: "string",
          },
          gridX: {
            minimum: 0,
            type: "integer",
          },
          gridY: {
            minimum: 0,
            type: "integer",
          },
          weather: {
            required: ["values"],
            type: "object",
            properties: {
              values: {
                type: "array",
                items: {
                  required: ["validTime", "value"],
                  type: "object",
                  properties: {
                    validTime: {
                      $ref: "#/components/schemas/ISO8601Interval",
                    },
                    value: {
                      type: "array",
                      items: {
                        required: [
                          "coverage",
                          "weather",
                          "intensity",
                          "visibility",
                          "attributes",
                        ],
                        type: "object",
                        properties: {
                          coverage: {
                            enum: [
                              "areas",
                              "brief",
                              "chance",
                              "definite",
                              "few",
                              "frequent",
                              "intermittent",
                              "isolated",
                              "likely",
                              "numerous",
                              "occasional",
                              "patchy",
                              "periods",
                              "scattered",
                              "slight_chance",
                              "widespread",
                            ],
                            type: "string",
                            nullable: true,
                          },
                          weather: {
                            enum: [
                              "blowing_dust",
                              "blowing_sand",
                              "blowing_snow",
                              "drizzle",
                              "fog",
                              "freezing_fog",
                              "freezing_drizzle",
                              "freezing_rain",
                              "freezing_spray",
                              "frost",
                              "hail",
                              "haze",
                              "ice_crystals",
                              "ice_fog",
                              "rain",
                              "rain_showers",
                              "sleet",
                              "smoke",
                              "snow",
                              "snow_showers",
                              "thunderstorms",
                              "volcanic_ash",
                              "water_spouts",
                            ],
                            type: "string",
                            nullable: true,
                          },
                          intensity: {
                            enum: ["very_light", "light", "moderate", "heavy"],
                            type: "string",
                            nullable: true,
                          },
                          visibility: {
                            $ref: "#/components/schemas/QuantitativeValue",
                          },
                          attributes: {
                            type: "array",
                            items: {
                              enum: [
                                "damaging_wind",
                                "dry_thunderstorms",
                                "flooding",
                                "gusty_wind",
                                "heavy_rain",
                                "large_hail",
                                "small_hail",
                                "tornadoes",
                              ],
                              type: "string",
                            },
                          },
                        },
                        description:
                          "A value object representing expected weather phenomena.",
                        additionalProperties: false,
                      },
                    },
                  },
                  additionalProperties: false,
                },
              },
            },
          },
          hazards: {
            required: ["values"],
            type: "object",
            properties: {
              values: {
                type: "array",
                items: {
                  required: ["validTime", "value"],
                  type: "object",
                  properties: {
                    validTime: {
                      $ref: "#/components/schemas/ISO8601Interval",
                    },
                    value: {
                      type: "array",
                      items: {
                        required: [
                          "phenomenon",
                          "significance",
                          "event_number",
                        ],
                        type: "object",
                        properties: {
                          phenomenon: {
                            pattern: "^\\w{2}$",
                            type: "string",
                            description:
                              "Hazard code. This value will correspond to a P-VTEC phenomenon code as defined in NWS Directive 10-1703.\n",
                          },
                          significance: {
                            pattern: "^\\w$",
                            type: "string",
                            description:
                              'Significance code. This value will correspond to a P-VTEC significance code as defined in NWS Directive 10-1703.\nThis will most frequently be "A" for a watch or "Y" for an advisory.\n',
                          },
                          event_number: {
                            type: "integer",
                            description:
                              "Event number. If this hazard refers to a national or regional center product (such as a Storm Prediction Center convective watch), this value will be the sequence number of that product.\n",
                            nullable: true,
                          },
                        },
                        description:
                          "A value object representing an expected hazard.",
                      },
                    },
                  },
                  additionalProperties: false,
                },
              },
            },
          },
        },
        description:
          "Raw forecast data for a 2.5km grid square.\nThis is a list of all potential data layers that may appear. Some layers may not be present in all areas.\n* temperature\n* dewpoint\n* maxTemperature\n* minTemperature\n* relativeHumidity\n* apparentTemperature\n* heatIndex\n* windChill\n* wetBulbGlobeTemperature\n* skyCover\n* windDirection\n* windSpeed\n* windGust\n* weather\n* hazards: Watch and advisory products in effect\n* probabilityOfPrecipitation\n* quantitativePrecipitation\n* iceAccumulation\n* snowfallAmount\n* snowLevel\n* ceilingHeight\n* visibility\n* transportWindSpeed\n* transportWindDirection\n* mixingHeight\n* hainesIndex\n* lightningActivityLevel\n* twentyFootWindSpeed\n* twentyFootWindDirection\n* waveHeight\n* wavePeriod\n* waveDirection\n* primarySwellHeight\n* primarySwellDirection\n* secondarySwellHeight\n* secondarySwellDirection\n* wavePeriod2\n* windWaveHeight\n* dispersionIndex\n* pressure: Barometric pressure\n* probabilityOfTropicalStormWinds\n* probabilityOfHurricaneWinds\n* potentialOf15mphWinds\n* potentialOf25mphWinds\n* potentialOf35mphWinds\n* potentialOf45mphWinds\n* potentialOf20mphWindGusts\n* potentialOf30mphWindGusts\n* potentialOf40mphWindGusts\n* potentialOf50mphWindGusts\n* potentialOf60mphWindGusts\n* grasslandFireDangerIndex\n* probabilityOfThunder\n* davisStabilityIndex\n* atmosphericDispersionIndex\n* lowVisibilityOccurrenceRiskIndex\n* stability\n* redFlagThreatIndex\n",
        additionalProperties: {
          $ref: "#/components/schemas/GridpointQuantitativeValueLayer",
        },
      },
      GridpointQuantitativeValueLayer: {
        required: ["values"],
        type: "object",
        properties: {
          uom: {
            $ref: "#/components/schemas/UnitOfMeasure",
          },
          values: {
            type: "array",
            items: {
              required: ["validTime", "value"],
              type: "object",
              properties: {
                validTime: {
                  $ref: "#/components/schemas/ISO8601Interval",
                },
                value: {
                  type: "number",
                  nullable: true,
                },
              },
              additionalProperties: false,
            },
          },
        },
        description:
          "A gridpoint layer consisting of quantitative values (numeric values with associated units of measure).\n",
      },
      GridpointGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeature",
          },
          {
            type: "object",
            properties: {
              properties: {
                $ref: "#/components/schemas/Gridpoint",
              },
            },
          },
        ],
      },
      GridpointJsonLd: {
        $ref: "#/components/schemas/Gridpoint",
      },
      GridpointForecast: {
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          geometry: {
            $ref: "#/components/schemas/GeometryString",
          },
          units: {
            $ref: "#/components/schemas/GridpointForecastUnits",
          },
          forecastGenerator: {
            type: "string",
            description:
              "The internal generator class used to create the forecast text (used for NWS debugging).",
          },
          generatedAt: {
            type: "string",
            description: "The time this forecast data was generated.",
            format: "date-time",
          },
          updateTime: {
            type: "string",
            description:
              "The last update time of the data this forecast was generated from.",
            format: "date-time",
          },
          updated: {
            type: "string",
            description:
              "This property is deprecated (use updateTime instead).",
            format: "date-time",
            deprecated: true,
          },
          validTimes: {
            $ref: "#/components/schemas/ISO8601Interval",
          },
          elevation: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          periods: {
            type: "array",
            items: {
              $ref: "#/components/schemas/GridpointForecastPeriod",
            },
            description: "An array of forecast periods.",
          },
        },
        description: "A multi-day forecast for a 2.5km grid square.",
        additionalProperties: false,
      },
      GridpointForecastPeriod: {
        type: "object",
        properties: {
          number: {
            minimum: 1,
            type: "integer",
            description: "Sequential period number.",
          },
          name: {
            type: "string",
            description:
              "A textual identifier for the period. This value will not be present for hourly forecasts.\n",
            example: "Tuesday Night",
          },
          startTime: {
            type: "string",
            description:
              "The starting time that this forecast period is valid for.",
            format: "date-time",
          },
          endTime: {
            type: "string",
            description:
              "The ending time that this forecast period is valid for.",
            format: "date-time",
          },
          isDaytime: {
            type: "boolean",
            description:
              "Indicates whether this period is daytime or nighttime.",
          },
          temperature: {
            oneOf: [
              {
                $ref: "#/components/schemas/QuantitativeValue",
              },
              {
                type: "integer",
              },
            ],
            description:
              'High/low temperature for the period, depending on whether the period is day or night.\nThis property as an integer value is deprecated. Future versions will express this value as a quantitative value object. To make use of the future standard format now, set the "forecast_temperature_qv" feature flag on the request.\n',
          },
          temperatureUnit: {
            enum: ["F", "C"],
            type: "string",
            description:
              'The unit of the temperature value (Fahrenheit or Celsius).\nThis property is deprecated. Future versions will indicate the unit within the quantitative value object for the temperature property. To make use of the future standard format now, set the "forecast_temperature_qv" feature flag on the request.\n',
            deprecated: true,
          },
          temperatureTrend: {
            enum: ["rising", "falling"],
            type: "string",
            description:
              "If not null, indicates a non-diurnal temperature trend for the period (either rising temperature overnight, or falling temperature during the day)\n",
            nullable: true,
          },
          probabilityOfPrecipitation: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          dewpoint: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          relativeHumidity: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          windSpeed: {
            oneOf: [
              {
                $ref: "#/components/schemas/QuantitativeValue",
              },
              {
                type: "string",
              },
            ],
            description:
              'Wind speed for the period.\nThis property as an string value is deprecated. Future versions will express this value as a quantitative value object. To make use of the future standard format now, set the "forecast_wind_speed_qv" feature flag on the request.\n',
          },
          windGust: {
            oneOf: [
              {
                $ref: "#/components/schemas/QuantitativeValue",
              },
              {
                type: "string",
              },
            ],
            description:
              'Peak wind gust for the period.\nThis property as an string value is deprecated. Future versions will express this value as a quantitative value object. To make use of the future standard format now, set the "forecast_wind_speed_qv" feature flag on the request.\n',
            nullable: true,
          },
          windDirection: {
            enum: [
              "N",
              "NNE",
              "NE",
              "ENE",
              "E",
              "ESE",
              "SE",
              "SSE",
              "S",
              "SSW",
              "SW",
              "WSW",
              "W",
              "WNW",
              "NW",
              "NNW",
            ],
            type: "string",
            description:
              "The prevailing direction of the wind for the period, using a 16-point compass.",
          },
          icon: {
            type: "string",
            description: "A link to an icon representing the forecast summary.",
            format: "uri",
            deprecated: true,
          },
          shortForecast: {
            type: "string",
            description: "A brief textual forecast summary for the period.",
          },
          detailedForecast: {
            type: "string",
            description: "A detailed textual forecast for the period.",
          },
        },
        description:
          "An object containing forecast information for a specific time period (generally 12-hour or 1-hour).\n",
        additionalProperties: false,
      },
      GridpointForecastUnits: {
        enum: ["us", "si"],
        type: "string",
        description:
          "Denotes the units used in the textual portions of the forecast.",
        default: "us",
      },
      GridpointForecastGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeature",
          },
          {
            type: "object",
            properties: {
              properties: {
                $ref: "#/components/schemas/GridpointForecast",
              },
            },
          },
        ],
      },
      GridpointForecastJsonLd: {
        allOf: [
          {
            $ref: "#/components/schemas/GridpointForecast",
          },
          {
            required: ["@context", "geometry"],
            type: "object",
            properties: {
              "@context": {
                $ref: "#/components/schemas/JsonLdContext",
              },
              geometry: {
                $ref: "#/components/schemas/GeometryString",
              },
            },
          },
        ],
      },
      ISO8601Duration: {
        pattern: "^P(\\d+Y)?(\\d+M)?(\\d+D)?(T(\\d+H)?(\\d+M)?(\\d+S)?)?$",
        type: "string",
        description: "A time duration in ISO 8601 format.",
        example: "P2DT12H",
      },
      ISO8601Interval: {
        oneOf: [
          {
            pattern:
              "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(Z|[+-]\\d{2}:?\\d{2}?)|NOW)\\/(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(Z|[+-]\\d{2}:?\\d{2}?)|NOW)$",
            type: "string",
            example: "2007-03-01T13:00:00Z/2008-05-11T15:30:00Z",
          },
          {
            pattern:
              "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(Z|[+-]\\d{2}:?\\d{2}?)|NOW)\\/P(\\d+Y)?(\\d+M)?(\\d+D)?(T(\\d+H)?(\\d+M)?(\\d+S)?)?$",
            type: "string",
            example: "2007-03-01T13:00:00Z/P1Y2M10DT2H30M",
          },
          {
            pattern:
              "^P(\\d+Y)?(\\d+M)?(\\d+D)?(T(\\d+H)?(\\d+M)?(\\d+S)?)?\\/(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(Z|[+-]\\d{2}:?\\d{2}?)|NOW)$",
            type: "string",
            example: "P1Y2M10DT2H30M/2008-05-11T15:30:00Z",
          },
        ],
        description:
          'A time interval in ISO 8601 format. This can be one of:\n\n    1. Start and end time\n    2. Start time and duration\n    3. Duration and end time\nThe string "NOW" can also be used in place of a start/end time.\n',
      },
      JsonLdContext: {
        anyOf: [
          {
            type: "array",
            items: {},
          },
          {
            type: "object",
          },
        ],
      },
      LandRegionCode: {
        enum: ["AR", "CR", "ER", "PR", "SR", "WR"],
        type: "string",
        description:
          "Land region code. These correspond to the six NWS regional headquarters:\n* AR: Alaska Region\n* CR: Central Region\n* ER: Eastern Region\n* PR: Pacific Region\n* SR: Southern Region\n* WR: Western Region\n",
      },
      MarineAreaCode: {
        enum: [
          "AM",
          "AN",
          "GM",
          "LC",
          "LE",
          "LH",
          "LM",
          "LO",
          "LS",
          "PH",
          "PK",
          "PM",
          "PS",
          "PZ",
          "SL",
        ],
        type: "string",
        description:
          "Marine area code as defined in NWS Directive 10-302:\n* AM: Western North Atlantic Ocean and along U.S. East Coast south of Currituck Beach Light NC following the coastline into Gulf of Mexico to Ocean Reef FL including the Caribbean\n* AN: Western North Atlantic Ocean and along U.S. East Coast from Canadian border south to Currituck Beach Light NC\n* GM: Gulf of Mexico and along the U.S. Gulf Coast from the Mexican border to Ocean Reef FL\n* LC: Lake St. Clair\n* LE: Lake Erie\n* LH: Lake Huron\n* LM: Lake Michigan\n* LO: Lake Ontario\n* LS: Lake Superior\n* PH: Central Pacific Ocean including Hawaiian waters\n* PK: North Pacific Ocean near Alaska and along Alaska coastline including the Bering Sea and the Gulf of Alaska\n* PM: Western Pacific Ocean including Mariana Island waters\n* PS: South Central Pacific Ocean including American Samoa waters\n* PZ: Eastern North Pacific Ocean and along U.S. West Coast from Canadian border to Mexican border\n* SL: St. Lawrence River above St. Regis\n",
      },
      MarineRegionCode: {
        enum: ["AL", "AT", "GL", "GM", "PA", "PI"],
        type: "string",
        description:
          "Marine region code. These are groups of marine areas combined.\n* AL: Alaska waters (PK)\n* AT: Atlantic Ocean (AM, AN)\n* GL: Great Lakes (LC, LE, LH, LM, LO, LS, SL)\n* GM: Gulf of Mexico (GM)\n* PA: Eastern Pacific Ocean and U.S. West Coast (PZ)\n* PI: Central and Western Pacific (PH, PM, PS)\n",
      },
      MetarPhenomenon: {
        required: ["intensity", "modifier", "weather", "rawString"],
        type: "object",
        properties: {
          intensity: {
            enum: ["light", "heavy"],
            type: "string",
            nullable: true,
          },
          modifier: {
            enum: [
              "patches",
              "blowing",
              "low_drifting",
              "freezing",
              "shallow",
              "partial",
              "showers",
            ],
            type: "string",
            nullable: true,
          },
          weather: {
            enum: [
              "fog_mist",
              "dust_storm",
              "dust",
              "drizzle",
              "funnel_cloud",
              "fog",
              "smoke",
              "hail",
              "snow_pellets",
              "haze",
              "ice_crystals",
              "ice_pellets",
              "dust_whirls",
              "spray",
              "rain",
              "sand",
              "snow_grains",
              "snow",
              "squalls",
              "sand_storm",
              "thunderstorms",
              "unknown",
              "volcanic_ash",
            ],
            type: "string",
          },
          rawString: {
            type: "string",
          },
          inVicinity: {
            type: "boolean",
          },
        },
        description:
          "An object representing a decoded METAR phenomenon string.",
        additionalProperties: false,
      },
      MetarSkyCoverage: {
        enum: ["OVC", "BKN", "SCT", "FEW", "SKC", "CLR", "VV"],
        type: "string",
      },
      NWSCenterWeatherServiceUnitId: {
        enum: [
          "ZAB",
          "ZAN",
          "ZAU",
          "ZBW",
          "ZDC",
          "ZDV",
          "ZFA",
          "ZFW",
          "ZHU",
          "ZID",
          "ZJX",
          "ZKC",
          "ZLA",
          "ZLC",
          "ZMA",
          "ZME",
          "ZMP",
          "ZNY",
          "ZOA",
          "ZOB",
          "ZSE",
          "ZTL",
        ],
        type: "string",
        description:
          "Three-letter identifier for a Center Weather Service Unit (CWSU).",
      },
      NWSForecastOfficeId: {
        enum: [
          "AKQ",
          "ALY",
          "BGM",
          "BOX",
          "BTV",
          "BUF",
          "CAE",
          "CAR",
          "CHS",
          "CLE",
          "CTP",
          "GSP",
          "GYX",
          "ILM",
          "ILN",
          "LWX",
          "MHX",
          "OKX",
          "PBZ",
          "PHI",
          "RAH",
          "RLX",
          "RNK",
          "ABQ",
          "AMA",
          "BMX",
          "BRO",
          "CRP",
          "EPZ",
          "EWX",
          "FFC",
          "FWD",
          "HGX",
          "HUN",
          "JAN",
          "JAX",
          "KEY",
          "LCH",
          "LIX",
          "LUB",
          "LZK",
          "MAF",
          "MEG",
          "MFL",
          "MLB",
          "MOB",
          "MRX",
          "OHX",
          "OUN",
          "SHV",
          "SJT",
          "SJU",
          "TAE",
          "TBW",
          "TSA",
          "ABR",
          "APX",
          "ARX",
          "BIS",
          "BOU",
          "CYS",
          "DDC",
          "DLH",
          "DMX",
          "DTX",
          "DVN",
          "EAX",
          "FGF",
          "FSD",
          "GID",
          "GJT",
          "GLD",
          "GRB",
          "GRR",
          "ICT",
          "ILX",
          "IND",
          "IWX",
          "JKL",
          "LBF",
          "LMK",
          "LOT",
          "LSX",
          "MKX",
          "MPX",
          "MQT",
          "OAX",
          "PAH",
          "PUB",
          "RIW",
          "SGF",
          "TOP",
          "UNR",
          "BOI",
          "BYZ",
          "EKA",
          "FGZ",
          "GGW",
          "HNX",
          "LKN",
          "LOX",
          "MFR",
          "MSO",
          "MTR",
          "OTX",
          "PDT",
          "PIH",
          "PQR",
          "PSR",
          "REV",
          "SEW",
          "SGX",
          "SLC",
          "STO",
          "TFX",
          "TWC",
          "VEF",
          "AER",
          "AFC",
          "AFG",
          "AJK",
          "ALU",
          "GUM",
          "HPA",
          "HFO",
          "PPG",
          "STU",
          "NH1",
          "NH2",
          "ONA",
          "ONP",
        ],
        type: "string",
        description: "Three-letter identifier for a NWS office.",
      },
      NWSNationalHQId: {
        enum: ["NWS"],
        type: "string",
        description: "Three-letter identifier for NWS National HQ.",
      },
      NWSOfficeId: {
        oneOf: [
          {
            $ref: "#/components/schemas/NWSForecastOfficeId",
          },
          {
            $ref: "#/components/schemas/NWSRegionalHQId",
          },
          {
            $ref: "#/components/schemas/NWSNationalHQId",
          },
        ],
      },
      NWSRegionalHQId: {
        enum: ["ARH", "CRH", "ERH", "PRH", "SRH", "WRH"],
        type: "string",
        description: "Three-letter identifier for a NWS Regional HQ.",
      },
      NWSZoneID: {
        pattern:
          "^(A[KLMNRSZ]|C[AOT]|D[CE]|F[LM]|G[AMU]|I[ADLN]|K[SY]|L[ACEHMOS]|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[AHKMRSWZ]|S[CDL]|T[NX]|UT|V[AIT]|W[AIVY]|[HR]I)[CZ]\\d{3}$",
        type: "string",
        description:
          "UGC identifier for a NWS forecast zone or county.\nThe first two letters will correspond to either a state code or marine area code (see #/components/schemas/StateTerritoryCode and #/components/schemas/MarineAreaCode for lists of valid letter combinations).\nThe third letter will be Z for public/fire zone or C for county.\n",
      },
      NWSZoneType: {
        enum: [
          "land",
          "marine",
          "forecast",
          "public",
          "coastal",
          "offshore",
          "fire",
          "county",
        ],
        type: "string",
      },
      Observation: {
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          geometry: {
            $ref: "#/components/schemas/GeometryString",
          },
          "@id": {
            type: "string",
            format: "uri",
          },
          "@type": {
            enum: ["wx:ObservationStation"],
            type: "string",
          },
          elevation: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          station: {
            type: "string",
            format: "uri",
          },
          timestamp: {
            type: "string",
            format: "date-time",
          },
          rawMessage: {
            type: "string",
          },
          textDescription: {
            type: "string",
          },
          icon: {
            type: "string",
            format: "uri",
            nullable: true,
            deprecated: true,
          },
          presentWeather: {
            type: "array",
            items: {
              $ref: "#/components/schemas/MetarPhenomenon",
            },
          },
          temperature: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          dewpoint: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          windDirection: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          windSpeed: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          windGust: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          barometricPressure: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          seaLevelPressure: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          visibility: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          maxTemperatureLast24Hours: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          minTemperatureLast24Hours: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          precipitationLastHour: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          precipitationLast3Hours: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          precipitationLast6Hours: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          relativeHumidity: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          windChill: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          heatIndex: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          cloudLayers: {
            type: "array",
            items: {
              required: ["base", "amount"],
              type: "object",
              properties: {
                base: {
                  $ref: "#/components/schemas/QuantitativeValue",
                },
                amount: {
                  $ref: "#/components/schemas/MetarSkyCoverage",
                },
              },
              additionalProperties: false,
            },
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      ObservationGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeature",
          },
          {
            type: "object",
            properties: {
              properties: {
                $ref: "#/components/schemas/Observation",
              },
            },
          },
        ],
      },
      ObservationJsonLd: {
        $ref: "#/components/schemas/Observation",
      },
      ObservationCollectionGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeatureCollection",
          },
          {
            type: "object",
            properties: {
              features: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      $ref: "#/components/schemas/Observation",
                    },
                  },
                },
              },
            },
          },
        ],
      },
      ObservationCollectionJsonLd: {
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          "@graph": {
            type: "array",
            items: {
              $ref: "#/components/schemas/Observation",
            },
          },
        },
        additionalProperties: false,
      },
      ObservationStation: {
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          geometry: {
            $ref: "#/components/schemas/GeometryString",
          },
          "@id": {
            type: "string",
            format: "uri",
          },
          "@type": {
            enum: ["wx:ObservationStation"],
            type: "string",
          },
          elevation: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          stationIdentifier: {
            type: "string",
          },
          name: {
            type: "string",
          },
          timeZone: {
            type: "string",
            format: "iana-time-zone-identifier",
          },
          forecast: {
            type: "string",
            description:
              "A link to the NWS public forecast zone containing this station.",
            format: "uri",
          },
          county: {
            type: "string",
            description:
              "A link to the NWS county zone containing this station.",
            format: "uri",
          },
          fireWeatherZone: {
            type: "string",
            description:
              "A link to the NWS fire weather forecast zone containing this station.",
            format: "uri",
          },
        },
        additionalProperties: false,
      },
      ObservationStationGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeature",
          },
          {
            type: "object",
            properties: {
              properties: {
                $ref: "#/components/schemas/ObservationStation",
              },
            },
          },
        ],
      },
      ObservationStationJsonLd: {
        allOf: [
          {
            $ref: "#/components/schemas/ObservationStation",
          },
          {
            required: ["@context", "geometry"],
            type: "object",
            properties: {
              "@context": {
                $ref: "#/components/schemas/JsonLdContext",
              },
              geometry: {
                $ref: "#/components/schemas/GeometryString",
              },
            },
          },
        ],
      },
      ObservationStationCollectionGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeatureCollection",
          },
          {
            type: "object",
            properties: {
              features: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      $ref: "#/components/schemas/ObservationStation",
                    },
                  },
                },
              },
              observationStations: {
                type: "array",
                items: {
                  type: "string",
                  format: "uri",
                },
              },
              pagination: {
                $ref: "#/components/schemas/PaginationInfo",
              },
            },
          },
        ],
      },
      ObservationStationCollectionJsonLd: {
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          "@graph": {
            type: "array",
            items: {
              $ref: "#/components/schemas/ObservationStation",
            },
          },
          observationStations: {
            type: "array",
            items: {
              type: "string",
              format: "uri",
            },
          },
          pagination: {
            $ref: "#/components/schemas/PaginationInfo",
          },
        },
        additionalProperties: false,
      },
      Office: {
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          "@type": {
            enum: ["GovernmentOrganization"],
            type: "string",
          },
          "@id": {
            type: "string",
            format: "uri",
          },
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          address: {
            type: "object",
            properties: {
              "@type": {
                enum: ["PostalAddress"],
                type: "string",
              },
              streetAddress: {
                type: "string",
              },
              addressLocality: {
                type: "string",
              },
              addressRegion: {
                type: "string",
              },
              postalCode: {
                type: "string",
              },
            },
            additionalProperties: false,
          },
          telephone: {
            type: "string",
          },
          faxNumber: {
            type: "string",
          },
          email: {
            type: "string",
          },
          sameAs: {
            type: "string",
            format: "uri",
          },
          nwsRegion: {
            type: "string",
          },
          parentOrganization: {
            type: "string",
            format: "uri",
          },
          responsibleCounties: {
            type: "array",
            items: {
              type: "string",
              format: "uri",
            },
          },
          responsibleForecastZones: {
            type: "array",
            items: {
              type: "string",
              format: "uri",
            },
          },
          responsibleFireZones: {
            type: "array",
            items: {
              type: "string",
              format: "uri",
            },
          },
          approvedObservationStations: {
            type: "array",
            items: {
              type: "string",
              format: "uri",
            },
          },
        },
        additionalProperties: false,
      },
      OfficeHeadline: {
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          "@id": {
            type: "string",
            format: "uri",
          },
          id: {
            type: "string",
          },
          office: {
            type: "string",
            format: "uri",
          },
          important: {
            type: "boolean",
          },
          issuanceTime: {
            type: "string",
            format: "date-time",
          },
          link: {
            type: "string",
            format: "uri",
          },
          name: {
            type: "string",
          },
          title: {
            type: "string",
          },
          summary: {
            type: "string",
            nullable: true,
          },
          content: {
            type: "string",
          },
        },
      },
      OfficeHeadlineCollection: {
        required: ["@context", "@graph"],
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          "@graph": {
            type: "array",
            items: {
              $ref: "#/components/schemas/OfficeHeadline",
            },
          },
        },
        additionalProperties: false,
      },
      PaginationInfo: {
        required: ["next"],
        type: "object",
        properties: {
          next: {
            type: "string",
            description: "A link to the next page of records",
            format: "uri",
          },
        },
        description: "Links for retrieving more data from paged data sets",
        additionalProperties: false,
      },
      Point: {
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          geometry: {
            $ref: "#/components/schemas/GeometryString",
          },
          "@id": {
            type: "string",
            format: "uri",
          },
          "@type": {
            enum: ["wx:Point"],
            type: "string",
          },
          cwa: {
            $ref: "#/components/schemas/NWSForecastOfficeId",
          },
          forecastOffice: {
            type: "string",
            format: "uri",
          },
          gridId: {
            $ref: "#/components/schemas/NWSForecastOfficeId",
          },
          gridX: {
            minimum: 0,
            type: "integer",
          },
          gridY: {
            minimum: 0,
            type: "integer",
          },
          forecast: {
            type: "string",
            format: "uri",
          },
          forecastHourly: {
            type: "string",
            format: "uri",
          },
          forecastGridData: {
            type: "string",
            format: "uri",
          },
          observationStations: {
            type: "string",
            format: "uri",
          },
          relativeLocation: {
            oneOf: [
              {
                $ref: "#/components/schemas/RelativeLocationGeoJson",
              },
              {
                $ref: "#/components/schemas/RelativeLocationJsonLd",
              },
            ],
          },
          forecastZone: {
            type: "string",
            format: "uri",
          },
          county: {
            type: "string",
            format: "uri",
          },
          fireWeatherZone: {
            type: "string",
            format: "uri",
          },
          timeZone: {
            type: "string",
          },
          radarStation: {
            type: "string",
          },
        },
      },
      PointGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeature",
          },
          {
            type: "object",
            properties: {
              properties: {
                $ref: "#/components/schemas/Point",
              },
            },
          },
        ],
      },
      PointJsonLd: {
        allOf: [
          {
            $ref: "#/components/schemas/Point",
          },
          {
            required: ["@context", "geometry"],
            type: "object",
            properties: {
              "@context": {
                $ref: "#/components/schemas/JsonLdContext",
              },
              geometry: {
                $ref: "#/components/schemas/GeometryString",
              },
            },
          },
        ],
      },
      PointString: {
        pattern: "^(-?\\d+(?:\\.\\d+)?),(-?\\d+(?:\\.\\d+)?)$",
        type: "string",
      },
      ProblemDetail: {
        required: [
          "type",
          "title",
          "status",
          "detail",
          "instance",
          "correlationId",
        ],
        type: "object",
        properties: {
          type: {
            type: "string",
            description:
              "A URI reference (RFC 3986) that identifies the problem type. This is only an identifier and is not necessarily a resolvable URL.\n",
            format: "uri",
            default: "about:blank",
            example: "urn:noaa:nws:api:UnexpectedProblem",
          },
          title: {
            type: "string",
            description: "A short, human-readable summary of the problem type.",
            example: "Unexpected Problem",
          },
          status: {
            maximum: 999,
            minimum: 100,
            type: "number",
            description:
              "The HTTP status code (RFC 7231, Section 6) generated by the origin server for this occurrence of the problem.\n",
            example: 500,
          },
          detail: {
            type: "string",
            description:
              "A human-readable explanation specific to this occurrence of the problem.",
            example: "An unexpected problem has occurred.",
          },
          instance: {
            type: "string",
            description:
              "A URI reference (RFC 3986) that identifies the specific occurrence of the problem. This is only an identifier and is not necessarily a resolvable URL.\n",
            format: "uri",
            example:
              "urn:noaa:nws:api:request:493c3a1d-f87e-407f-ae2c-24483f5aab63",
          },
          correlationId: {
            type: "string",
            description:
              "A unique identifier for the request, used for NWS debugging purposes. Please include this identifier with any correspondence to help us investigate your issue.\n",
            example: "493c3a1d-f87e-407f-ae2c-24483f5aab63",
          },
        },
        description:
          "Detail about an error. This document conforms to RFC 7807 (Problem Details for HTTP APIs).",
        additionalProperties: true,
      },
      QuantitativeValue: {
        type: "object",
        properties: {
          value: {
            type: "number",
            description: "A measured value",
            nullable: true,
          },
          maxValue: {
            type: "number",
            description: "The maximum value of a range of measured values",
          },
          minValue: {
            type: "number",
            description: "The minimum value of a range of measured values",
          },
          unitCode: {
            $ref: "#/components/schemas/UnitOfMeasure",
          },
          qualityControl: {
            enum: ["Z", "C", "S", "V", "X", "Q", "G", "B", "T"],
            type: "string",
            description:
              "For values in observation records, the quality control flag from the MADIS system. The definitions of these flags can be found at https://madis.ncep.noaa.gov/madis_sfc_qc_notes.shtml\n",
          },
        },
        description:
          "A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue\n",
        additionalProperties: false,
      },
      RegionCode: {
        oneOf: [
          {
            $ref: "#/components/schemas/LandRegionCode",
          },
          {
            $ref: "#/components/schemas/MarineRegionCode",
          },
        ],
      },
      RelativeLocation: {
        type: "object",
        properties: {
          city: {
            type: "string",
          },
          state: {
            type: "string",
          },
          distance: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
          bearing: {
            $ref: "#/components/schemas/QuantitativeValue",
          },
        },
      },
      RelativeLocationGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeature",
          },
          {
            type: "object",
            properties: {
              properties: {
                $ref: "#/components/schemas/RelativeLocation",
              },
            },
          },
        ],
      },
      RelativeLocationJsonLd: {
        allOf: [
          {
            $ref: "#/components/schemas/RelativeLocation",
          },
          {
            required: ["geometry"],
            type: "object",
            properties: {
              geometry: {
                $ref: "#/components/schemas/GeometryString",
              },
            },
          },
        ],
      },
      Sigmet: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uri",
          },
          issueTime: {
            type: "string",
            format: "date-time",
          },
          fir: {
            type: "string",
            nullable: true,
          },
          atsu: {
            $ref: "#/components/schemas/ATSUIdentifier",
          },
          sequence: {
            type: "string",
            nullable: true,
          },
          phenomenon: {
            type: "string",
            format: "uri",
            nullable: true,
          },
          start: {
            type: "string",
            format: "date-time",
          },
          end: {
            type: "string",
            format: "date-time",
          },
        },
        additionalProperties: false,
      },
      SigmetCollectionGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeatureCollection",
          },
          {
            type: "object",
            properties: {
              features: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/SigmetGeoJson",
                },
              },
            },
          },
        ],
      },
      SigmetGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeature",
          },
          {
            type: "object",
            properties: {
              properties: {
                $ref: "#/components/schemas/Sigmet",
              },
            },
          },
        ],
      },
      SigmetSequenceNumber: {
        type: "string",
      },
      StateTerritoryCode: {
        enum: [
          "AL",
          "AK",
          "AS",
          "AR",
          "AZ",
          "CA",
          "CO",
          "CT",
          "DE",
          "DC",
          "FL",
          "GA",
          "GU",
          "HI",
          "ID",
          "IL",
          "IN",
          "IA",
          "KS",
          "KY",
          "LA",
          "ME",
          "MD",
          "MA",
          "MI",
          "MN",
          "MS",
          "MO",
          "MT",
          "NE",
          "NV",
          "NH",
          "NJ",
          "NM",
          "NY",
          "NC",
          "ND",
          "OH",
          "OK",
          "OR",
          "PA",
          "PR",
          "RI",
          "SC",
          "SD",
          "TN",
          "TX",
          "UT",
          "VT",
          "VI",
          "VA",
          "WA",
          "WV",
          "WI",
          "WY",
          "MP",
          "PW",
          "FM",
          "MH",
        ],
        type: "string",
      },
      TextProduct: {
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          "@id": {
            type: "string",
            format: "uri",
          },
          id: {
            type: "string",
          },
          wmoCollectiveId: {
            type: "string",
          },
          issuingOffice: {
            type: "string",
          },
          issuanceTime: {
            type: "string",
            format: "date-time",
          },
          productCode: {
            type: "string",
          },
          productName: {
            type: "string",
          },
          productText: {
            type: "string",
          },
        },
        additionalProperties: false,
      },
      TextProductCollection: {
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          "@graph": {
            type: "array",
            items: {
              $ref: "#/components/schemas/TextProduct",
            },
          },
        },
        additionalProperties: false,
      },
      TextProductTypeCollection: {
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          "@graph": {
            type: "array",
            items: {
              required: ["productCode", "productName"],
              type: "object",
              properties: {
                productCode: {
                  type: "string",
                },
                productName: {
                  type: "string",
                },
              },
              additionalProperties: false,
            },
          },
        },
        additionalProperties: false,
      },
      TextProductLocationCollection: {
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          locations: {
            type: "object",
            additionalProperties: {
              type: "string",
              nullable: true,
            },
          },
        },
        additionalProperties: false,
      },
      Time: {
        pattern: "^([01][0-9]|2[0-3])[0-5][0-9]$",
        type: "string",
        description:
          "A time (in HHMM format). This is always specified in UTC (Zulu) time.",
      },
      UnitOfMeasure: {
        pattern: "^((wmo|uc|wmoUnit|nwsUnit):)?.*$",
        type: "string",
        description:
          'A string denoting a unit of measure, expressed in the format "{unit}" or "{namespace}:{unit}".\nUnits with the namespace "wmo" or "wmoUnit" are defined in the World Meteorological Organization Codes Registry at http://codes.wmo.int/common/unit and should be canonically resolvable to http://codes.wmo.int/common/unit/{unit}.\nUnits with the namespace "nwsUnit" are currently custom and do not align to any standard.\nUnits with no namespace or the namespace "uc" are compliant with the Unified Code for Units of Measure syntax defined at https://unitsofmeasure.org/. This also aligns with recent versions of the Geographic Markup Language (GML) standard, the IWXXM standard, and OGC Observations and Measurements v2.0 (ISO/DIS 19156).\nNamespaced units are considered deprecated. We will be aligning API to use the same standards as GML/IWXXM in the future.\n',
      },
      Zone: {
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          geometry: {
            $ref: "#/components/schemas/GeometryString",
          },
          "@id": {
            type: "string",
            format: "uri",
          },
          "@type": {
            enum: ["wx:Zone"],
            type: "string",
          },
          id: {
            $ref: "#/components/schemas/NWSZoneID",
          },
          type: {
            $ref: "#/components/schemas/NWSZoneType",
          },
          name: {
            type: "string",
          },
          effectiveDate: {
            type: "string",
            format: "date-time",
          },
          expirationDate: {
            type: "string",
            format: "date-time",
          },
          state: {
            oneOf: [
              {
                $ref: "#/components/schemas/StateTerritoryCode",
              },
              {
                enum: [""],
                type: "string",
                nullable: true,
              },
            ],
          },
          cwa: {
            type: "array",
            items: {
              $ref: "#/components/schemas/NWSForecastOfficeId",
            },
          },
          forecastOffices: {
            type: "array",
            items: {
              type: "string",
              format: "uri",
            },
          },
          timeZone: {
            type: "array",
            items: {
              type: "string",
              format: "iana-time-zone-identifier",
            },
          },
          observationStations: {
            type: "array",
            items: {
              type: "string",
              format: "uri",
            },
          },
          radarStation: {
            type: "string",
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      ZoneGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeature",
          },
          {
            type: "object",
            properties: {
              properties: {
                $ref: "#/components/schemas/Zone",
              },
            },
          },
        ],
      },
      ZoneJsonLd: {
        $ref: "#/components/schemas/Zone",
      },
      ZoneCollectionGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeatureCollection",
          },
          {
            type: "object",
            properties: {
              features: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      $ref: "#/components/schemas/Zone",
                    },
                  },
                },
              },
            },
          },
        ],
      },
      ZoneCollectionJsonLd: {
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          "@graph": {
            type: "array",
            items: {
              $ref: "#/components/schemas/Zone",
            },
          },
        },
        additionalProperties: false,
      },
      ZoneForecast: {
        type: "object",
        properties: {
          "@context": {
            $ref: "#/components/schemas/JsonLdContext",
          },
          geometry: {
            $ref: "#/components/schemas/GeometryString",
          },
          zone: {
            type: "string",
            description: "An API link to the zone this forecast is for.",
            format: "uri",
          },
          updated: {
            type: "string",
            description: "The time this zone forecast product was published.",
            format: "date-time",
          },
          periods: {
            type: "array",
            items: {
              required: ["number", "name", "detailedForecast"],
              type: "object",
              properties: {
                number: {
                  type: "integer",
                  description: "A sequential identifier number.",
                },
                name: {
                  type: "string",
                  description: "A textual description of the period.",
                  example: "This Afternoon",
                },
                detailedForecast: {
                  type: "string",
                  description: "A detailed textual forecast for the period.",
                },
              },
              additionalProperties: false,
            },
            description: "An array of forecast periods.",
          },
        },
        description: "An object representing a zone area forecast.",
        additionalProperties: false,
      },
      ZoneForecastGeoJson: {
        allOf: [
          {
            $ref: "#/components/schemas/GeoJsonFeature",
          },
          {
            type: "object",
            properties: {
              properties: {
                $ref: "#/components/schemas/ZoneForecast",
              },
            },
          },
        ],
      },
      ZoneForecastJsonLd: {
        $ref: "#/components/schemas/ZoneForecast",
      },
    },
    responses: {
      AlertCollection: {
        description: "A collection of alerts.",
        headers: {
          "X-Correlation-Id": {
            $ref: "#/components/headers/CorrelationId",
          },
          "X-Request-Id": {
            $ref: "#/components/headers/RequestId",
          },
          "X-Server-Id": {
            $ref: "#/components/headers/ServerId",
          },
        },
        content: {
          "application/geo+json": {
            schema: {
              $ref: "#/components/schemas/AlertCollectionGeoJson",
            },
          },
          "application/ld+json": {
            schema: {
              $ref: "#/components/schemas/AlertCollectionJsonLd",
            },
          },
          "application/atom+xml": {
            schema: {
              $ref: "#/components/schemas/AlertAtomFeed",
            },
          },
        },
        "x-url-content-negotiation-extensions": {
          json: "application/geo+json",
          atom: "application/atom+xml",
        },
      },
      Error: {
        description: "An error response.",
        headers: {
          "X-Correlation-Id": {
            $ref: "#/components/headers/CorrelationId",
          },
          "X-Request-Id": {
            $ref: "#/components/headers/RequestId",
          },
          "X-Server-Id": {
            $ref: "#/components/headers/ServerId",
          },
        },
        content: {
          "application/problem+json": {
            schema: {
              $ref: "#/components/schemas/ProblemDetail",
            },
          },
        },
      },
      GridpointForecast: {
        description: "A forecast for a gridpoint.",
        headers: {
          "X-Correlation-Id": {
            $ref: "#/components/headers/CorrelationId",
          },
          "X-Request-Id": {
            $ref: "#/components/headers/RequestId",
          },
          "X-Server-Id": {
            $ref: "#/components/headers/ServerId",
          },
        },
        content: {
          "application/geo+json": {
            schema: {
              $ref: "#/components/schemas/GridpointForecastGeoJson",
            },
          },
          "application/ld+json": {
            schema: {
              $ref: "#/components/schemas/GridpointForecastJsonLd",
            },
          },
          "application/vnd.noaa.dwml+xml": {
            schema: {},
          },
        },
      },
      Observation: {
        description: "An observation record.",
        headers: {
          "X-Correlation-Id": {
            $ref: "#/components/headers/CorrelationId",
          },
          "X-Request-Id": {
            $ref: "#/components/headers/RequestId",
          },
          "X-Server-Id": {
            $ref: "#/components/headers/ServerId",
          },
        },
        content: {
          "application/geo+json": {
            schema: {
              $ref: "#/components/schemas/ObservationGeoJson",
            },
          },
          "application/ld+json": {
            schema: {
              $ref: "#/components/schemas/ObservationJsonLd",
            },
          },
          "application/vnd.noaa.uswx+xml": {
            schema: {},
          },
          "application/vnd.noaa.obs+xml": {
            schema: {},
          },
        },
      },
      ObservationCollection: {
        description: "A collection of observation records.",
        headers: {
          "X-Correlation-Id": {
            $ref: "#/components/headers/CorrelationId",
          },
          "X-Request-Id": {
            $ref: "#/components/headers/RequestId",
          },
          "X-Server-Id": {
            $ref: "#/components/headers/ServerId",
          },
        },
        content: {
          "application/geo+json": {
            schema: {
              $ref: "#/components/schemas/ObservationCollectionGeoJson",
            },
          },
          "application/ld+json": {
            schema: {
              $ref: "#/components/schemas/ObservationCollectionJsonLd",
            },
          },
        },
      },
      ObservationStationCollection: {
        description: "A collection of observation stations.",
        headers: {
          "X-Correlation-Id": {
            $ref: "#/components/headers/CorrelationId",
          },
          "X-Request-Id": {
            $ref: "#/components/headers/RequestId",
          },
          "X-Server-Id": {
            $ref: "#/components/headers/ServerId",
          },
        },
        content: {
          "application/geo+json": {
            schema: {
              $ref: "#/components/schemas/ObservationStationCollectionGeoJson",
            },
          },
          "application/ld+json": {
            schema: {
              $ref: "#/components/schemas/ObservationStationCollectionJsonLd",
            },
          },
        },
      },
    },
    parameters: {
      AlertArea: {
        name: "area",
        in: "query",
        description:
          "State/territory code or marine area code\nThis parameter is incompatible with the following parameters: point, region, region_type, zone\n",
        style: "form",
        explode: false,
        schema: {
          type: "array",
          items: {
            $ref: "#/components/schemas/AreaCode",
          },
        },
      },
      AlertCertainty: {
        name: "certainty",
        in: "query",
        description:
          "Certainty (observed, likely, possible, unlikely, unknown)",
        style: "form",
        explode: false,
        schema: {
          type: "array",
          items: {
            $ref: "#/components/schemas/AlertCertainty",
          },
        },
      },
      AlertCode: {
        name: "code",
        in: "query",
        description: "Event code",
        style: "form",
        explode: false,
        schema: {
          type: "array",
          items: {
            pattern: "^\\w{3}$",
            type: "string",
          },
        },
      },
      AlertEventName: {
        name: "event",
        in: "query",
        description: "Event name",
        style: "form",
        explode: false,
        schema: {
          type: "array",
          items: {
            pattern: "^[A-Za-z0-9 ]+$",
            type: "string",
          },
        },
      },
      AlertMessageType: {
        name: "message_type",
        in: "query",
        description: "Message type (alert, update, cancel)",
        style: "form",
        explode: false,
        schema: {
          type: "array",
          items: {
            enum: ["alert", "update", "cancel"],
            type: "string",
          },
        },
      },
      AlertPoint: {
        name: "point",
        in: "query",
        description:
          "Point (latitude,longitude)\nThis parameter is incompatible with the following parameters: area, region, region_type, zone\n",
        schema: {
          $ref: "#/components/schemas/PointString",
        },
      },
      AlertRegion: {
        name: "region",
        in: "query",
        description:
          "Marine region code\nThis parameter is incompatible with the following parameters: area, point, region_type, zone\n",
        style: "form",
        explode: false,
        schema: {
          type: "array",
          items: {
            $ref: "#/components/schemas/MarineRegionCode",
          },
        },
      },
      AlertRegionType: {
        name: "region_type",
        in: "query",
        description:
          "Region type (land or marine)\nThis parameter is incompatible with the following parameters: area, point, region, zone\n",
        schema: {
          enum: ["land", "marine"],
          type: "string",
        },
      },
      AlertSeverity: {
        name: "severity",
        in: "query",
        description: "Severity (extreme, severe, moderate, minor, unknown)",
        style: "form",
        explode: false,
        schema: {
          type: "array",
          items: {
            $ref: "#/components/schemas/AlertSeverity",
          },
        },
      },
      AlertStatus: {
        name: "status",
        in: "query",
        description: "Status (actual, exercise, system, test, draft)",
        style: "form",
        explode: false,
        schema: {
          type: "array",
          items: {
            enum: ["actual", "exercise", "system", "test", "draft"],
            type: "string",
          },
        },
      },
      AlertUrgency: {
        name: "urgency",
        in: "query",
        description: "Urgency (immediate, expected, future, past, unknown)",
        style: "form",
        explode: false,
        schema: {
          type: "array",
          items: {
            $ref: "#/components/schemas/AlertUrgency",
          },
        },
      },
      AlertZone: {
        name: "zone",
        in: "query",
        description:
          "Zone ID (forecast or county)\nThis parameter is incompatible with the following parameters: area, point, region, region_type\n",
        style: "form",
        explode: false,
        schema: {
          type: "array",
          items: {
            $ref: "#/components/schemas/NWSZoneID",
          },
        },
      },
      ATSUIdentifier: {
        name: "atsu",
        in: "path",
        description: "ATSU identifier",
        required: true,
        schema: {
          $ref: "#/components/schemas/ATSUIdentifier",
        },
      },
      Date: {
        name: "date",
        in: "path",
        description: "Date (YYYY-MM-DD format)",
        required: true,
        schema: {
          $ref: "#/components/schemas/Date",
        },
      },
      GridpointForecastFeatureFlags: {
        name: "Feature-Flags",
        in: "header",
        description:
          "Enable future and experimental features (see documentation for more info):\n* forecast_temperature_qv: Represent temperature as QuantitativeValue\n* forecast_wind_speed_qv: Represent wind speed as QuantitativeValue\n",
        required: false,
        style: "simple",
        explode: false,
        schema: {
          type: "array",
          items: {
            enum: ["forecast_temperature_qv", "forecast_wind_speed_qv"],
            type: "string",
          },
        },
      },
      GridpointForecastUnits: {
        name: "units",
        in: "query",
        description: "Use US customary or SI (metric) units in textual output",
        schema: {
          $ref: "#/components/schemas/GridpointForecastUnits",
        },
      },
      GridpointWFO: {
        name: "wfo",
        in: "path",
        description: "Forecast office ID",
        required: true,
        schema: {
          $ref: "#/components/schemas/NWSForecastOfficeId",
        },
      },
      GridpointX: {
        name: "x",
        in: "path",
        description: "Forecast grid X coordinate",
        required: true,
        schema: {
          minimum: 0,
          type: "integer",
        },
      },
      GridpointY: {
        name: "y",
        in: "path",
        description: "Forecast grid Y coordinate",
        required: true,
        schema: {
          minimum: 0,
          type: "integer",
        },
      },
      Limit: {
        name: "limit",
        in: "query",
        description: "Limit",
        schema: {
          maximum: 500,
          minimum: 1,
          type: "integer",
          default: 500,
        },
      },
      NWSCenterWeatherServiceUnitId: {
        name: "cwsuId",
        in: "path",
        description: "NWS CWSU ID",
        required: true,
        schema: {
          $ref: "#/components/schemas/NWSCenterWeatherServiceUnitId",
        },
      },
      NWSOfficeId: {
        name: "officeId",
        in: "path",
        description: "NWS office ID",
        required: true,
        schema: {
          $ref: "#/components/schemas/NWSOfficeId",
        },
      },
      NWSZoneId: {
        name: "zoneId",
        in: "path",
        description: "NWS public zone/county identifier",
        required: true,
        schema: {
          $ref: "#/components/schemas/NWSZoneID",
        },
      },
      ObservationStationId: {
        name: "stationId",
        in: "path",
        description: "Observation station ID",
        required: true,
        schema: {
          type: "string",
        },
      },
      PaginationCursor: {
        name: "cursor",
        in: "query",
        description: "Pagination cursor",
        schema: {
          type: "string",
        },
      },
      PathPoint: {
        name: "point",
        in: "path",
        description: "Point (latitude, longitude)",
        required: true,
        schema: {
          $ref: "#/components/schemas/PointString",
        },
      },
      QueryDate: {
        name: "date",
        in: "query",
        description: "Date (YYYY-MM-DD format)",
        schema: {
          $ref: "#/components/schemas/Date",
        },
      },
      QueryStartTime: {
        name: "start",
        in: "query",
        description: "Start time",
        schema: {
          type: "string",
          format: "date-time",
        },
      },
      QueryEndTime: {
        name: "end",
        in: "query",
        description: "End time",
        schema: {
          type: "string",
          format: "date-time",
        },
      },
      SigmetSequenceNumber: {
        name: "sequence",
        in: "path",
        description: "SIGMET sequence number",
        required: true,
        schema: {
          $ref: "#/components/schemas/SigmetSequenceNumber",
        },
      },
      Time: {
        name: "time",
        in: "path",
        description:
          "Time (HHMM format). This time is always specified in UTC (Zulu) time.",
        required: true,
        schema: {
          $ref: "#/components/schemas/Time",
        },
      },
    },
    headers: {
      CorrelationId: {
        description:
          "A unique identifier for the request, used for NWS debugging purposes. Please include this identifier with any correspondence to help us investigate your issue.\n",
        schema: {
          type: "string",
        },
      },
      RequestId: {
        description:
          "A unique identifier for the request, used for NWS debugging purposes. Please include this identifier with any correspondence to help us investigate your issue.\n",
        schema: {
          type: "string",
        },
      },
      ServerId: {
        description:
          "The identifier of the server that generated the response, used for NWS debugging purposes. Please include this identifier with any correspondence to help us investigate your issue.\n",
        schema: {
          type: "string",
        },
      },
    },
    securitySchemes: {
      userAgent: {
        type: "apiKey",
        description:
          "We require that all consumers of the API include a User-Agent header in requests. This is due to a high number of scripts exhibiting abusive behavior (intentional or unintentional). We recommend setting the value to something that identifies your application and includes a contact email. This will help us contact you if we notice unusual behavior and also aid in troubleshooting issues.\nThe API remains open and free to use and there are no limits imposed based on the User-Agent string.\nThis mechanism will be replaced with a more typical API key system at a later date.\n",
        name: "User-Agent",
        in: "header",
      },
    },
  },
  security: [
    {
      userAgent: [],
    },
  ],
  externalDocs: {
    description: "Full API documentation",
    url: "https://www.weather.gov/documentation/services-web-api",
  },
  test: 'test',
  test2: 'test2'
};
