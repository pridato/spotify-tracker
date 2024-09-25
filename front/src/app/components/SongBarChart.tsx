"use client";
import { ResponsiveLine } from '@nivo/line';

interface SongData {
  track: {
    name: string;
    artists: { name: string }[];
  };
  count: number; // Contador de veces que se ha escuchado
}

interface SongLineChartProps {
  data: SongData[];
}

const SongLineChart: React.FC<SongLineChartProps> = ({ data }) => {
  const formattedData = data.map((song) => ({
    x: song.track.name, // Nombre de la canción
    y: song.count, // Contador de reproducciones
    artists: song.track.artists.map((author) => author.name),
  }));

  const groupedData = [
    {
      id: 'Reproducciones',
      data: formattedData.map(song => ({ x: song.x, y: song.y })),
    },
  ];

  return (
    <div style={{ height: '500px' }}>
      <ResponsiveLine
        data={groupedData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legend: 'Canciones',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Reproducciones',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        enablePoints={false}
        pointSize={10}
        pointColor={{ from: 'color' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        useMesh={true} // Permitir interactividad con la malla
        enableArea={false}
        colors={{ scheme: 'blues' }}
        lineWidth={2}
        curve='monotoneX'
        enableGridX={false}
        enableGridY={true}
        animate={false} // Animación habilitada
        tooltip={({ point }) => (
          <div style={{ padding: '10px', background: 'white', border: '1px solid #ccc' }}>
            <strong>{point.data.x as string}</strong><br />
            {
              data[point.index].track.artists.map((author) => {
                return <span key={author.name}>{author.name} </span>
              })
            }
            <div>Reproducciones: {point.data.y.toString()}</div>
          </div>
        )}
      />
    </div>
  );
};

export default SongLineChart;
