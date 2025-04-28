/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner'; // <-- Nowy import Sonner
import api from '@/lib/api';

type Drug = {
  idDrug: number;
  name: string;
  price: number;
  category: string;
  description: string;
  availability: boolean;
};

export default function Dashboard() {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortField, setSortField] = useState<'name' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [orderAmount, setOrderAmount] = useState('1');
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  const categories = [
    { value: 'all', label: 'Wszystkie Kategorie' },
    { value: 'pain-relief', label: 'Przeciwbólowe' },
    { value: 'antibiotics', label: 'Antybiotyki' },
    { value: 'antihistamines', label: 'Antyhistaminowe' },
  ];

  const itemsPerPage = 9;

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        setLoading(true);
        const response = await api<{ drugs: Drug[]; total: number }>(
          `/listDrugs?page=${page}&limit=${itemsPerPage}`
        );
        setDrugs(response.data.drugs || []);
        setTotalPages(Math.ceil((response.data.total || response.data.drugs.length) / itemsPerPage));
      } catch (error) {
        console.error(error);
        toast.error('Nie udało się załadować listy leków.');
      } finally {
        setLoading(false);
      }
    };
    fetchDrugs();
  }, [page]);

  const handleSort = (field: 'name' | 'price') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedDrugs = drugs
    .filter((drug) => {
      const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || drug.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const aValue = sortField === 'price' ? a.price : a.name;
      const bValue = sortField === 'price' ? b.price : b.name;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0; // Default return to ensure a number is always returned
    });

  async function orderDrug(drug: Drug) {
    if (!orderAmount || parseFloat(orderAmount) <= 0) {
      toast.error('Proszę podać poprawną ilość.');
      return;
    }

    try {
      await api('/orderDrug', {
        method: 'POST',
        data: { id: drug.idDrug, amount: parseFloat(orderAmount) },
      });
      toast.success(`Zakupiono ${drug.name} w ilości ${orderAmount}!`);
      setIsOrderDialogOpen(false);
      setOrderAmount('1');
    } catch (e: any) {
      toast.error(`Nie udało się złożyć zamówienia: ${e.message}`);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Katalog Leków</CardTitle>
          <CardDescription>
            Przeglądaj naszą szeroką ofertę leków i składaj zamówienia
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Szukaj leków..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtruj po kategorii" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <Select
                value={sortField}
                onValueChange={(value) => handleSort(value as 'name' | 'price')}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sortuj według" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nazwa {sortOrder === 'asc' ? '↑' : '↓'}</SelectItem>
                  <SelectItem value="price">Cena {sortOrder === 'asc' ? '↑' : '↓'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Ładowanie leków...</p>
            </div>
          ) : filteredAndSortedDrugs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nie znaleziono leków spełniających kryteria
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                  setSortField('name');
                  setSortOrder('asc');
                }}
              >
                Wyczyść Filtry
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedDrugs.map((drug) => (
                <Card key={drug.idDrug} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl">{drug.name}</CardTitle>
                    <CardDescription>
                      {drug.category
                        ? categories.find((c) => c.value === drug.category)?.label
                        : 'Brak kategorii'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-2">
                      <p className="text-lg font-semibold">Cena: {drug.price} zł</p>
                      <p className="text-sm text-muted-foreground">
                        {drug.description || 'Brak opisu.'}
                      </p>
                      {drug.availability ? (
                        <Badge variant="default">Dostępny</Badge>
                      ) : (
                        <Badge variant="destructive">Niedostępny</Badge>
                      )}
                    </div>
                  </CardContent>
                  <div className="p-4 mt-auto">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedDrug(drug)}
                        className="flex-1"
                      >
                        Szczegóły
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedDrug(drug);
                          setIsOrderDialogOpen(true);
                        }}
                        className="flex-1"
                        disabled={!drug.availability}
                      >
                        Kup
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {!loading && filteredAndSortedDrugs.length > 0 && (
        <div className="flex items-center justify-between mt-8">
          <p className="text-muted-foreground">
            Pokazano {filteredAndSortedDrugs.length} z {drugs.length} leków
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <p className="text-sm">
              Strona {page} z {totalPages}
            </p>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Drug Details Modal */}
      {selectedDrug && (
        <Dialog open={!!selectedDrug} onOpenChange={() => setSelectedDrug(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedDrug.name}</DialogTitle>
              <DialogDescription>
                Szczegółowe informacje o leku
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Kategoria</Label>
                <p>
                  {categories.find((c) => c.value === selectedDrug.category)?.label ||
                    'Brak kategorii'}
                </p>
              </div>
              <div>
                <Label>Cena</Label>
                <p>{selectedDrug.price} zł</p>
              </div>
              <div>
                <Label>Opis</Label>
                <p>{selectedDrug.description || 'Brak opisu.'}</p>
              </div>
              <div>
                <Label>Dostępność</Label>
                <p>
                  {selectedDrug.availability ? (
                    <Badge variant="default">Dostępny</Badge>
                  ) : (
                    <Badge variant="destructive">Niedostępny</Badge>
                  )}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedDrug(null)}
              >
                Zamknij
              </Button>
              <Button
                onClick={() => {
                  setIsOrderDialogOpen(true);
                }}
                disabled={!selectedDrug.availability}
              >
                Zamów
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Order Dialog */}
      {selectedDrug && (
        <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Zamów {selectedDrug.name}</DialogTitle>
              <DialogDescription>
                Wprowadź ilość leku, którą chcesz zamówić
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Ilość</Label>
                <Input
                  type="number"
                  min="1"
                  value={orderAmount}
                  onChange={(e) => setOrderAmount(e.target.value)}
                  placeholder="Podaj ilość"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Cena za sztukę: {selectedDrug.price} zł | Całkowity koszt:{' '}
                {(parseFloat(orderAmount) * selectedDrug.price || 0).toFixed(2)} zł
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsOrderDialogOpen(false);
                  setOrderAmount('1');
                }}
              >
                Anuluj
              </Button>
              <Button
                onClick={() => orderDrug(selectedDrug)}
                disabled={!orderAmount || parseFloat(orderAmount) <= 0}
              >
                Potwierdź Zamówienie
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
