import { Chip, Grid, Typography, Button } from '@mui/material'
import { InformationContainer } from '@pagopa/interop-fe-commons'
import LaunchIcon from '@mui/icons-material/Launch'
import LockIcon from '@mui/icons-material/Lock'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useTranslation } from 'react-i18next'
import format from 'date-fns/format'
import { ProbingDataAlert } from '../probingDataAlert/ProbingDataAlert'
import { ServiceMainData, ServiceProbingData } from '../../types'

interface IProps {
  mainData?: ServiceMainData
  probingData?: ServiceProbingData
  reloadProbingDetails: () => void
  viewInCatalogue?: () => void
}

const blocksInfo: Array<{ title: string; blocks: Array<string> }> = [
  {
    title: 'Informazioni generali',
    blocks: ['producerName', 'versionNumber', 'eserviceName'],
  },
  {
    title: 'In tempo reale',
    blocks: ['probingEnabled', 'state', 'responseReceived'],
  },
]

export const InformationBlock: React.FC<IProps> = ({
  mainData,
  probingData,
  reloadProbingDetails,
  viewInCatalogue,
}) => {
  const { t } = useTranslation(['detailsPage', 'general'])

  const getChipColor = (value: string) => {
    switch (value) {
      case 'ONLINE':
      case 'true':
        return 'success'
      case 'OFFLINE':
      case 'false':
        return 'error'
      case 'N/D':
        return 'warning'
    }
  }

  const getChipLabel = (value: boolean) => {
    switch (value) {
      case true:
        return 'active'
      case false:
        return 'suspended'
    }
  }

  return (
    <>
      <Grid container direction={'column'} alignItems="center" mb={5}>
        {mainData && (
          <Grid item container direction="column" mb={5}>
            {blocksInfo[0].blocks.map((block) => {
              return block === 'eserviceName' ? (
                <Grid item key={block}>
                  <InformationContainer
                    key={block}
                    label={t(block, { ns: 'detailsPage' }).toUpperCase()}
                    content={
                      <Grid container>
                        <Button
                          color={'primary'}
                          disableRipple // remove onClick effect
                          sx={{
                            fontWeight: 'bold',
                            border: 'none!important',
                            textTransform: 'none',
                            alignItems: 'start !important',
                            p: '0',
                            '&:hover': {
                              backgroundColor: 'transparent',
                            },
                            '& .MuiButton-startIcon': {
                              paddingBottom: '1%',
                            },
                          }}
                          variant="outlined"
                          startIcon={<LockIcon />}
                          endIcon={<LaunchIcon />}
                          onClick={viewInCatalogue}
                        >
                          {t('viewInCatalog', { ns: 'detailsPage' })}
                        </Button>
                      </Grid>
                    }
                  />
                </Grid>
              ) : (
                <Grid item key={block}>
                  <InformationContainer
                    label={t(block, { ns: 'detailsPage' }).toUpperCase()}
                    content={mainData[block as keyof ServiceMainData] as string}
                  />
                </Grid>
              )
            })}
          </Grid>
        )}
        {probingData && (
          <>
            <Grid item container direction="column">
              <Grid item textAlign={'center'}>
                <Typography variant="h5">{t('realTimeTitle', { ns: 'detailsPage' })}</Typography>
              </Grid>
              <Grid
                item
                container
                xs={6}
                px={2}
                my={2}
                justifyContent={'end'}
                sx={{ backgroundColor: '#F2F2F2' }}
              >
                <Button
                  onClick={() => reloadProbingDetails()}
                  color={'primary'}
                  disableRipple
                  sx={{
                    fontWeight: 'bold',
                    border: 'none!important',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                >
                  {t('reload', { ns: 'detailsPage' })}
                </Button>
              </Grid>
              <Grid item container direction="column">
                {blocksInfo[1].blocks.map((block) => (
                  <Grid item key={block}>
                    <InformationContainer
                      key={block}
                      label={t(block, { ns: 'detailsPage' }).toUpperCase()}
                      content={
                        ['probingEnabled', 'state'].includes(block) ? (
                          <Chip
                            size={'small'}
                            label={
                              block === 'state'
                                ? probingData[block as keyof ServiceProbingData]
                                    .toString()
                                    .toLowerCase()
                                : t(getChipLabel(probingData.probingEnabled), {
                                    ns: 'detailsPage',
                                  })
                            }
                            color={getChipColor(
                              probingData[block as keyof ServiceProbingData].toString()
                            )}
                          />
                        ) : probingData['responseReceived'] ? (
                          format(
                            new Date(probingData['responseReceived']),
                            t('dateFormat', {
                              ns: 'general',
                            })
                          )
                        ) : (
                          ''
                        )
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <ProbingDataAlert
              probingEnabled={probingData.probingEnabled}
              state={probingData.state}
              eserviceActive={probingData.eserviceActive}
            />
          </>
        )}
      </Grid>
    </>
  )
}
