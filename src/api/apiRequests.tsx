import {
  GetServicesType,
  GetServicesTelemetry,
  GetServicesFilteredTelemetry,
} from './apiRequestTypes'
import { http as interopAxiosClient } from './interopAxiosClient'

/**
 * Return services based on the filters and the pagination input
 * @param {GetServicesType} data
 */
const getServicesApi = async (payload: GetServicesType) => {
  return await interopAxiosClient
    .getServices(payload)
    .then((result: any) => {
      return result.data
    })
    .catch((error: any) => {
      throw error
    })
}
/**
 * Return the producers based on a like search on the input
 * @param {string} data
 */
const getProducers = async (payload: string) => {
  return await interopAxiosClient
    .getProducers(payload)
    .then((result: any) => {
      return result.data
    })
    .catch((error: any) => {
      throw error
    })
}

/**
 * Return e-service base data
 * @param {string} payload
 */
const getServiceMainData = async (payload: string) => {
  return await interopAxiosClient
    .getServiceMainData(payload)
    .then((result: any) => {
      return result.data
    })
    .catch((error: any) => {
      throw error
    })
}

/**
 * Return e-service probing data
 * @param {string} payload
 */
const getServiceProbingData = async (payload: string) => {
  return await interopAxiosClient
    .getServiceProbingData(payload)
    .then((result: any) => {
      return result.data
    })
    .catch((error: any) => {
      throw error
    })
}

/**
 * Return e-service statistics data
 * @param {string} payload
 */
const getServiceStatisticsData = async (payload: GetServicesTelemetry) => {
  return await interopAxiosClient
    .getServiceStatisticsData(payload)
    .then((result: any) => {
      return result.data
    })
    .catch((error: any) => {
      throw error
    })
}

/**
 * Return e-service statistics data filtered
 * @param {string} payload
 */
const getServiceFilteredStatisticsData = async (payload: GetServicesFilteredTelemetry) => {
  return await interopAxiosClient
    .getServiceFilteredStatisticsData(payload)
    .then((result: any) => {
      return result.data
    })
    .catch((error: any) => {
      throw error
    })
}

const apiRequests = {
  getServicesApi,
  getProducers,
  getServiceMainData,
  getServiceProbingData,
  getServiceStatisticsData,
  getServiceFilteredStatisticsData,
}

export default apiRequests
