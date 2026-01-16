import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Particle {
  id: number;
  x: number;
  y: number;
}

interface Leader {
  rank: number;
  name: string;
  clicks: number;
  avatar: string;
}

interface Tournament {
  name: string;
  endTime: Date;
  prize: string;
  participants: number;
}

export default function Index() {
  const [clicks, setClicks] = useState(0);
  const [happiness, setHappiness] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clickPower, setClickPower] = useState(1);
  const [totalClicks, setTotalClicks] = useState(0);

  const leaders: Leader[] = [
    { rank: 1, name: 'Патриот2024', clicks: 15420, avatar: '🇷🇺' },
    { rank: 2, name: 'ВладимирВ', clicks: 12350, avatar: '⭐' },
    { rank: 3, name: 'Россиянин', clicks: 10890, avatar: '🏆' },
    { rank: 4, name: 'Победа', clicks: 9540, avatar: '🎖️' },
    { rank: 5, name: 'Сила', clicks: 8720, avatar: '💪' },
  ];

  const tournaments: Tournament[] = [
    {
      name: 'Весенний рывок',
      endTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
      prize: '🏅 Золотая медаль',
      participants: 156,
    },
    {
      name: 'Патриотический марафон',
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      prize: '🎁 Эксклюзивный значок',
      participants: 342,
    },
  ];

  useEffect(() => {
    const newHappiness = Math.min(100, Math.floor((clicks / 100) * 100));
    setHappiness(newHappiness);
  }, [clicks]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setClicks((prev) => prev + clickPower);
    setTotalClicks((prev) => prev + clickPower);

    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x,
      y,
    };
    setParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1000);

    if (clicks > 0 && clicks % 50 === 0) {
      toast.success(`Отличная работа! ${clicks} кликов!`, {
        duration: 2000,
      });
    }
  };

  const getHappinessEmoji = () => {
    if (happiness < 20) return '😐';
    if (happiness < 40) return '🙂';
    if (happiness < 60) return '😊';
    if (happiness < 80) return '😄';
    return '😁';
  };

  const formatTime = (date: Date) => {
    const diff = date.getTime() - Date.now();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}ч ${minutes}м`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-white to-red-600 bg-clip-text text-transparent">
            Кликер Путина
          </h1>
          <p className="text-lg text-muted-foreground">Чем больше кликов, тем больше радости! 🇷🇺</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-white border-2 border-primary/20">
              <div className="text-center space-y-6">
                <div className="flex justify-around mb-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Всего кликов</p>
                    <p className="text-3xl font-bold text-primary">{clicks}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Уровень радости</p>
                    <p className="text-3xl font-bold text-accent">{happiness}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Сила клика</p>
                    <p className="text-3xl font-bold text-secondary">{clickPower}</p>
                  </div>
                </div>

                <div className="relative inline-block">
                  <Button
                    onClick={handleClick}
                    size="lg"
                    className="w-64 h-64 rounded-full text-8xl bg-gradient-to-br from-blue-600 via-white to-red-600 hover:from-blue-700 hover:via-gray-100 hover:to-red-700 shadow-2xl border-4 border-accent transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse-glow relative overflow-hidden"
                  >
                    <span className="relative z-10">{getHappinessEmoji()}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
                  </Button>

                  {particles.map((particle) => (
                    <div
                      key={particle.id}
                      className="absolute text-2xl font-bold text-accent pointer-events-none animate-float"
                      style={{
                        left: particle.x,
                        top: particle.y,
                        animation: 'float 1s ease-out forwards',
                      }}
                    >
                      +{clickPower}
                    </div>
                  ))}
                </div>

                <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-white to-red-600 transition-all duration-500 rounded-full"
                    style={{ width: `${happiness}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Button
                    variant="outline"
                    className="border-2 border-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      setClickPower((prev) => prev + 1);
                      toast.success(`Сила клика увеличена до ${clickPower + 1}!`);
                    }}
                  >
                    <Icon name="Zap" className="mr-2" />
                    Усилить клик
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-accent hover:bg-accent hover:text-accent-foreground"
                    onClick={() => {
                      setClicks(0);
                      setHappiness(0);
                      toast.info('Счётчик сброшен!');
                    }}
                  >
                    <Icon name="RotateCcw" className="mr-2" />
                    Сбросить
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Icon name="Trophy" className="mr-2 text-accent" />
                Статистика
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Icon name="MousePointerClick" className="mx-auto mb-2 text-primary" size={32} />
                  <p className="text-2xl font-bold text-primary">{totalClicks}</p>
                  <p className="text-sm text-muted-foreground">Всего кликов</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Icon name="Smile" className="mx-auto mb-2 text-accent" size={32} />
                  <p className="text-2xl font-bold text-accent">{happiness}%</p>
                  <p className="text-sm text-muted-foreground">Радость</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <Icon name="Zap" className="mx-auto mb-2 text-secondary" size={32} />
                  <p className="text-2xl font-bold text-secondary">{clickPower}x</p>
                  <p className="text-sm text-muted-foreground">Множитель</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <Tabs defaultValue="leaders" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="leaders">
                    <Icon name="Crown" className="mr-2" size={16} />
                    Лидеры
                  </TabsTrigger>
                  <TabsTrigger value="tournaments">
                    <Icon name="Flame" className="mr-2" size={16} />
                    Турниры
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="leaders" className="space-y-3 mt-4">
                  {leaders.map((leader) => (
                    <div
                      key={leader.rank}
                      className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        leader.rank === 1
                          ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-accent'
                          : leader.rank === 2
                          ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300'
                          : leader.rank === 3
                          ? 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={leader.rank <= 3 ? 'default' : 'outline'}
                          className={
                            leader.rank === 1
                              ? 'bg-accent text-accent-foreground'
                              : leader.rank === 2
                              ? 'bg-gray-400 text-white'
                              : leader.rank === 3
                              ? 'bg-orange-400 text-white'
                              : ''
                          }
                        >
                          #{leader.rank}
                        </Badge>
                        <span className="text-2xl">{leader.avatar}</span>
                        <span className="font-semibold">{leader.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{leader.clicks.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">кликов</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="tournaments" className="space-y-3 mt-4">
                  {tournaments.map((tournament, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-red-50 border-2 border-primary/30">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg">{tournament.name}</h3>
                        <Badge variant="destructive" className="animate-pulse">
                          <Icon name="Clock" size={12} className="mr-1" />
                          {formatTime(tournament.endTime)}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Gift" size={16} className="text-accent" />
                          <span>{tournament.prize}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Users" size={16} />
                          <span>{tournament.participants} участников</span>
                        </div>
                        <Button size="sm" className="w-full mt-2 bg-primary hover:bg-primary/90">
                          Участвовать
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-600 via-white to-red-600">
              <h3 className="font-bold text-lg mb-3 text-center">🎯 Правила игры</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="mt-1 text-primary flex-shrink-0" />
                  <span>Кликайте по эмодзи для увеличения счётчика</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="mt-1 text-primary flex-shrink-0" />
                  <span>Чем больше кликов, тем радостнее становится настроение</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="mt-1 text-primary flex-shrink-0" />
                  <span>Усиливайте клики для быстрого прогресса</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="mt-1 text-primary flex-shrink-0" />
                  <span>Участвуйте в турнирах и соревнуйтесь с другими</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="mt-1 text-primary flex-shrink-0" />
                  <span>Попадайте в топ лидеров!</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
