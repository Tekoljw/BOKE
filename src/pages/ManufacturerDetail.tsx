import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

const vendorIcons = ['🎮', '🎯', '🎲', '♠️', '🃏', '🎪', '🎨', '🎭', '🎰', '🧩', '🎪', '📱', '🖥️', '🚀', '🌟', '🔮', '💎', '🏆', '🎁', '🎨'];

const generateManufacturers = (categoryId: string, count: number, startIndex: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${categoryId}-${startIndex + i}`,
    name: `厂商 ${startIndex + i}`,
    icon: vendorIcons[Math.floor(Math.random() * vendorIcons.length)],
    description: `这是游戏厂商 ${startIndex + i} 的简短描述`,
    fullDescription: `厂商 ${startIndex + i} 是一家专业的游戏开发公司，成立于${2000 + Math.floor(Math.random() * 20)}年。
      公司专注于提供高质量的${categoryId === 'live' ? '真人' : categoryId === 'slots' ? '电子' : '棋牌'}游戏，拥有多年的行业经验和专业技术团队。
      厂商 ${startIndex + i} 的游戏以高清画质、流畅体验和创新玩法著称，深受玩家喜爱。`,
    games: Array.from({ length: 12 }, (_, j) => ({
      id: `${categoryId}-${startIndex + i}-${j}`,
      name: `游戏 ${j + 1}`,
      type: categoryId === 'live' ? '真人游戏' : categoryId === 'slots' ? '电子游戏' : '棋牌游戏',
      icon: vendorIcons[Math.floor(Math.random() * vendorIcons.length)]
    }))
  }));
};

const ManufacturerDetail: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'cn' | 'en'>('cn');
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const manufacturerCategories = [
    {
      id: 'live',
      name: '真人厂商',
      manufacturers: generateManufacturers('live', 7, 1)
    },
    {
      id: 'slots',
      name: '电子游戏',
      manufacturers: generateManufacturers('slots', 7, 8)
    },
    {
      id: 'poker',
      name: '棋牌游戏',
      manufacturers: generateManufacturers('poker', 6, 15)
    }
  ];

  const contactInfo = [
    { name: 'Toney', title: '商务总监', contact: '@Toney' },
    { name: 'Lion', title: '商务总监', contact: '@Lion' },
    { name: 'Hersinber', title: '商务总监', contact: '@Hersinber' }
  ];

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/530e81e8-804d-48ef-8b67-b896a5b21c01.png" 
              alt="波克棋牌" 
              className="h-8 w-auto"
            />
            <span className="text-2xl font-bold">波克棋牌</span>
          </Link>
          <div className="flex gap-4 items-center">
            <Button 
              variant="outline" 
              className="bg-sidebar text-white hover:bg-sidebar-accent flex items-center space-x-2"
              onClick={() => setLanguage(language === 'cn' ? 'en' : 'cn')}
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'cn' ? '中文' : 'English'}</span>
            </Button>
            <Link to="/login">
              <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
                登录
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost"
            size="icon"
            onClick={handleBackClick}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">游戏厂商</h1>
        </div>

        <Tabs defaultValue="live" className="w-full">
          <TabsList className="flex flex-wrap gap-2 mb-6 justify-start w-full">
            {manufacturerCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {manufacturerCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Tabs defaultValue={category.manufacturers[0]?.id} className="w-full">
                <TabsList className="flex flex-wrap gap-2 mb-6 justify-start w-full overflow-x-auto">
                  {category.manufacturers.map((manufacturer) => (
                    <TabsTrigger key={manufacturer.id} value={manufacturer.id}
                      className="flex items-center gap-2">
                      <span>{manufacturer.icon}</span>
                      <span>{manufacturer.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {category.manufacturers.map((manufacturer) => (
                  <TabsContent key={manufacturer.id} value={manufacturer.id}
                    className="bg-white rounded-lg shadow p-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{manufacturer.name}</h2>
                        <p className="text-gray-600 mb-4">{manufacturer.description}</p>
                        <div className="text-gray-600 whitespace-pre-line">
                          {manufacturer.fullDescription}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4">游戏列表</h3>
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-3">
                          {manufacturer.games.map((game) => (
                            <Card key={game.id} className="overflow-hidden aspect-square">
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-50 hover:from-orange-200 hover:to-orange-100 transition-colors cursor-pointer">
                                <img 
                                  src="/lovable-uploads/4b9bddee-a0e6-4dfb-ab50-2598752dec72.png"
                                  alt={game.name}
                                  className="w-4/5 h-4/5 object-contain"
                                />
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-center space-x-4">
                        <Button variant="outline">查看演示</Button>
                        <Button onClick={() => setContactDialogOpen(true)}>技术对接</Button>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-2">商务联系方式</DialogTitle>
            <DialogDescription>
              请联系以下商务人员获取技术对接支持
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {contactInfo.map((contact, index) => (
              <div key={index} className="p-4 border rounded-lg flex items-center gap-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">{contact.title} {contact.name}</h3>
                  <p className="text-gray-600">{contact.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManufacturerDetail;
