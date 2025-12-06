<?php

namespace App\Filament\Resources\PayChargeRequestResource\Pages;

use App\Filament\Resources\PayChargeRequestResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPayChargeRequests extends ListRecords
{
    protected static string $resource = PayChargeRequestResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
