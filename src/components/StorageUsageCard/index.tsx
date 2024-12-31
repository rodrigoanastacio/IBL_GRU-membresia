import { useEffect, useState } from 'react';
import { HardDrive } from 'lucide-react';
import * as S from './styles';
import { getBucketInfo, formatBytes } from '../../services/storage';

interface BucketInfo {
  name: string;
  size: number;
  totalSize: number;
  fileCount: number;
}

export function StorageUsageCard() {
  const [bucketInfo, setBucketInfo] = useState<BucketInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBucketInfo();
  }, []);

  const loadBucketInfo = async () => {
    try {
      const info = await getBucketInfo('documents');
      setBucketInfo(info);
    } catch (error) {
      console.error('Error loading bucket info:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <S.Container>
        <S.LoadingSpinner />
      </S.Container>
    );
  }

  if (!bucketInfo) {
    return (
      <S.Container>
        <S.ErrorMessage>
          Não foi possível carregar as informações de armazenamento
        </S.ErrorMessage>
      </S.Container>
    );
  }

  const usagePercentage = (bucketInfo.size / bucketInfo.totalSize) * 100;
  const isNearLimit = usagePercentage > 80;

  return (
    <S.Container>
      <S.Header>
        <S.IconContainer isNearLimit={isNearLimit}>
          <HardDrive size={24} />
        </S.IconContainer>
        <S.Title>Uso do Armazenamento</S.Title>
      </S.Header>

      <S.Content>
        <S.ProgressContainer>
          <S.ProgressBar
            percentage={usagePercentage}
            isNearLimit={isNearLimit}
          />
        </S.ProgressContainer>

        <S.StatsContainer>
          <S.StatItem>
            <S.StatLabel>Usado</S.StatLabel>
            <S.StatValue isNearLimit={isNearLimit}>
              {formatBytes(bucketInfo.size)}
            </S.StatValue>
          </S.StatItem>

          <S.StatDivider />

          <S.StatItem>
            <S.StatLabel>Total</S.StatLabel>
            <S.StatValue>
              {formatBytes(bucketInfo.totalSize)}
            </S.StatValue>
          </S.StatItem>

          <S.StatDivider />

          <S.StatItem>
            <S.StatLabel>Arquivos</S.StatLabel>
            <S.StatValue>
              {bucketInfo.fileCount}
            </S.StatValue>
          </S.StatItem>
        </S.StatsContainer>

        {isNearLimit && (
          <S.WarningMessage>
            Atenção: O armazenamento está próximo do limite!
          </S.WarningMessage>
        )}
      </S.Content>
    </S.Container>
  );
}
