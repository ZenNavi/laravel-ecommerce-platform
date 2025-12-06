<?php

namespace App\Filament\Resources\PayChargeRequestResource\Pages;

use App\Filament\Resources\PayChargeRequestResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPayChargeRequest extends EditRecord
{
    protected static string $resource = PayChargeRequestResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
