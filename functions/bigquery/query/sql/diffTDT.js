module.exports = `
SELECT
  MIN_TID as TID,
  MIN_TDT,
  MAX_TDT,
  ROUND(MAX_TDT - MIN_TDT, 3) as TDT_DIFF
FROM (
  SELECT
    TID AS MIN_TID,
    TDT AS MIN_TDT
  FROM (
    SELECT
      RANK() OVER (PARTITION BY TID ORDER BY CreatedAt ASC) AS RANK,
      TID,
      TDT,
      CreatedAt
    FROM
      \`maas_mumbai.battery\`
    WHERE
      CreatedAt BETWEEN @from
      AND @to )
  WHERE
    RANK = 1 ) AS MIN_TBL
JOIN (
    -- TID毎の最後の1件
  SELECT
    TID AS MAX_TID,
    TDT AS MAX_TDT
  FROM (
    SELECT
      *
    FROM (
      SELECT
        RANK() OVER (PARTITION BY TID ORDER BY CreatedAt DESC) AS RANK,
        TID,
        TDT,
        CreatedAt
      FROM
        \`maas_mumbai.battery\`
      WHERE
        CreatedAt BETWEEN @from
        AND @to )
    WHERE
      RANK = 1 ) )
ON
  MIN_TID = MAX_TID
ORDER BY TDT_DIFF DESC
LIMIT @limit
`
