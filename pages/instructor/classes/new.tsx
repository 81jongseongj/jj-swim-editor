import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateClassPage() {
  const [title, setTitle] = useState('');
  const [programType, setProgramType] = useState('자유형');
  const [level, setLevel] = useState('초급');
  const [schedule, setSchedule] = useState([{ day: '', startTime: '', endTime: '', lane: 1 }]);
  const [capacity, setCapacity] = useState(10);
  const [equipment, setEquipment] = useState('');
  const router = useRouter();

  const handleAddSchedule = () => {
    setSchedule([...schedule, { day: '', startTime: '', endTime: '', lane: 1 }]);
  };

  const handleChangeSchedule = (index: number, field: string, value: string | number) => {
    const updated = [...schedule];
    (updated[index] as any)[field] = value;
    setSchedule(updated);
  };

  const handleSubmit = async () => {
    const res = await fetch('/api/classes/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, programType, level, schedule, capacity, equipment: equipment.split(',') })
    });
    if (res.ok) {
      alert('수업이 등록되었습니다.');
      router.push('/instructor/classes');
    } else {
      alert('등록 실패');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">🆕 수업 등록</h1>

      <input className="border p-2 mb-3 w-full" placeholder="수업명" value={title} onChange={e => setTitle(e.target.value)} />

      <div className="flex gap-2 mb-3">
        <select className="border p-2" value={programType} onChange={e => setProgramType(e.target.value)}>
          <option>자유형</option><option>배영</option><option>평영</option><option>접영</option>
        </select>
        <select className="border p-2" value={level} onChange={e => setLevel(e.target.value)}>
          <option>초급</option><option>중급</option><option>상급</option>
        </select>
      </div>

      <h2 className="font-semibold">📅 요일 및 시간</h2>
      {schedule.map((s, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input className="border p-1 w-20" placeholder="요일" value={s.day} onChange={e => handleChangeSchedule(i, 'day', e.target.value)} />
          <input className="border p-1 w-24" placeholder="시작" value={s.startTime} onChange={e => handleChangeSchedule(i, 'startTime', e.target.value)} />
          <input className="border p-1 w-24" placeholder="종료" value={s.endTime} onChange={e => handleChangeSchedule(i, 'endTime', e.target.value)} />
          <input className="border p-1 w-16" placeholder="레인" type="number" value={s.lane} onChange={e => handleChangeSchedule(i, 'lane', Number(e.target.value))} />
        </div>
      ))}
      <button onClick={handleAddSchedule} className="text-blue-600 mb-4">+ 시간 추가</button>

      <input className="border p-2 mb-3 w-full" placeholder="정원 (숫자)" type="number" value={capacity} onChange={e => setCapacity(Number(e.target.value))} />
      <input className="border p-2 mb-3 w-full" placeholder="준비물(쉼표로 구분)" value={equipment} onChange={e => setEquipment(e.target.value)} />

      <button onClick={handleSubmit} className="bg-black text-white py-2 px-6 rounded">등록</button>
    </div>
  );
}