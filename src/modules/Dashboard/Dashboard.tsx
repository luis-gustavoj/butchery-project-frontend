import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SelectInput } from "src/components/input/select-input";
import { useAuthContext } from "src/contexts/AuthContext";
import { useDashboardQuery } from "src/hooks/useDashboard";
import { formatAsCurrency } from "src/utils/formatAsCurrency";
import { Layout } from "../layout";
import styles from "./styles.module.scss";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    label,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`R$ ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const MONTHS_OPTIONS = [
  { title: "Janeiro", value: "01" },
  { title: "Fevereiro", value: "02" },
  { title: "Março", value: "03" },
  { title: "Abril", value: "04" },
  { title: "Maio", value: "05" },
  { title: "Junho", value: "06" },
  { title: "Julho", value: "07" },
  { title: "Agosto", value: "08" },
  { title: "Setembro", value: "09" },
  { title: "Outubro", value: "10" },
  { title: "Novembro", value: "11" },
  { title: "Dezembro", value: "12" },
];

export const DashboardModule = () => {
  const [pieActiveIndex, setPieActiveIndex] = useState(0);
  const currentMonth = String(new Date().getMonth() + 1);
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const { user } = useAuthContext();
  const { data } = useDashboardQuery(user?.id, selectedMonth);

  return (
    <Layout>
      <div className={styles.titleContainer}>
        <h1>Dashboard</h1>
        <SelectInput
          placeholder="Selecione um mês para visualizar"
          name="select-report"
          value={selectedMonth}
          options={MONTHS_OPTIONS}
          onSelectOption={(_, v) => setSelectedMonth(v)}
        />
      </div>
      <div className={styles.chartsContainer}>
        <div className={styles.chart}>
          <p>Saída x Entrada</p>
          {data && data.inOut && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.inOut}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip formatter={(value) => formatAsCurrency(value)} />
                <Bar dataKey="Valor">
                  <Cell fill="#61CC72" />
                  <Cell fill="#B52F2F" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className={styles.chart}>
          <p>Análise de custo operacional</p>

          {data && data.operationalCosts && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={pieActiveIndex}
                  activeShape={renderActiveShape}
                  data={data.operationalCosts}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="Valor"
                  onMouseEnter={(_, ind) => setPieActiveIndex(ind)}
                >
                  {data.operationalCosts.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className={styles.chart} style={{ gridArea: "c" }}>
          <p>Ponto de equilíbrio</p>
          {data && data.breakeven && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={data.breakeven}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Vendas"
                  stroke="#61CC72"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="Custo fixo" stroke="#559DF9" />
                <Line
                  type="monotone"
                  dataKey="Custo variável"
                  stroke="#B52F2F"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </Layout>
  );
};
