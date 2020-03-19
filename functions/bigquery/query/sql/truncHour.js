module.exports = `
SELECT
  TID,
  truncCreatedAt as TIME,
  -- FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S %Z', truncCreatedAt, 'Asia/Kolkata') as TIME,
  -- TDT,
  -- LAG (TDT, 1) OVER (ORDER BY TID, CreatedAt, RANK) as LAG_TDT,
  -- ROUND(TDT - LAG (TDT, 1) OVER (PARTITION BY TID ORDER BY TID, CreatedAt, RANK), 3) as LAG_TDT_DIFF,
  -- FIRST_VALUE(TDT) OVER (PARTITION BY TID ORDER BY TID, CreatedAt, RANK) as FIRST_TDT,
  ROUND(TDT - FIRST_VALUE(TDT) OVER (PARTITION BY TID ORDER BY TID, CreatedAt, RANK) , 3) as TDT,
  SOC
FROM (
  SELECT
    RANK() OVER (PARTITION BY TID, truncCreatedAt ORDER BY CreatedAt DESC) AS RANK,
    TID,
    CreatedAt,
    truncCreatedAt,
    TDT,
    SOC
  FROM (
    SELECT
      TID,
      CreatedAt,
      TIMESTAMP_TRUNC(
        TIMESTAMP_SUB(CreatedAt, INTERVAL MOD(EXTRACT(HOUR FROM CreatedAt), @hour) HOUR), HOUR
      ) AS truncCreatedAt,
      TDT,
      SOC
    FROM
      \`maas_mumbai.battery\` 
    WHERE
      TID != ""
      AND CreatedAt BETWEEN @from and @to
    )
    WHERE truncCreatedAt BETWEEN @from and @to
  )
WHERE
  RANK = 1
`
