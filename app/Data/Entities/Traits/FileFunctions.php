<?php

namespace App\Data\Entities\Traits;

trait FileFunctions
{
    public static function boot()
    {
        parent::boot();

        static::creating(
            function ($record) {
                $record->saveFile();
            }
        );

        static::updating(
            function ($record) {
                $record->saveFile();
            }
        );
    }

    /**
     * @return string
     */
    public function getFileAttribute()
    {
        $fileId = $this->getFileId($this->attributes[$this->attributeFileName]);

        return $this->attributes[$this->attributeFileName] && file_exists($fileId) ? file_get_contents($fileId) : '';
    }

    /**
     * Gets the relative path to the file identified as specified.
     *
     * @param $fileId : The id of the file to build its relative path.
     * @return string: Which is the relative path to the file identified by the given id.
     */
    public function getFileId($fileId): string
    {
        $this->refreshFoldersPath();

        return $this->entityImagesUploadPath . '/' . $fileId;
    }

    private function refreshFoldersPath()
    {
        if (!file_exists($this->entityUploadPath)) {
            mkdir($this->entityUploadPath);
        }

        if (!file_exists($this->entityImagesUploadPath)) {
            mkdir($this->entityImagesUploadPath);
        }
    }

    /**
     * Save Client image.
     * @throws \Exception
     */
    public function saveFile()
    {
        if (!empty($this->attributes[$this->attributeFileName])) {
            $id = bin2hex(random_bytes(10));
            $fileId = $this->getFileId($id);
            $handle = fopen($fileId, 'w');
            fwrite($handle, $this->attributes[$this->attributeFileName]);
            fclose($handle);
            $this->attributes[$this->attributeFileName] = $id;
        }
    }

    /**
     * Delete the Entity's file.
     */
    public function deleteFile()
    {
        if (!empty($this->attributes[$this->attributeFileName]) &&
            file_exists($file = $this->getFileId($this->attributes[$this->attributeFileName]))) {
            unlink($file);
        }
    }
}