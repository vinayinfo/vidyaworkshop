"use client";

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface QrScannerDialogProps {
  onScan: (decodedText: string) => void;
  onOpenChange: (open: boolean) => void;
}

const QR_READER_ID = "qr-code-reader";

export default function QrScannerDialog({ onScan, onOpenChange }: QrScannerDialogProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const requestCameraPermission = async () => {
        try {
            const devices = await Html5Qrcode.getCameras();
            if (devices && devices.length) {
                setHasCameraPermission(true);
            } else {
                setHasCameraPermission(false);
            }
        } catch (err) {
            setHasCameraPermission(false);
            console.error("Camera permission error:", err);
             toast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: 'Could not get camera permissions. Please enable it in your browser settings.',
            });
        }
    };
    
    requestCameraPermission();

  }, [toast]);
  
  useEffect(() => {
      if (hasCameraPermission && !scannerRef.current) {
          const scanner = new Html5QrcodeScanner(
            QR_READER_ID,
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false
          );

          const onScanSuccess = (decodedText: string, decodedResult: any) => {
              scanner.clear();
              onScan(decodedText);
          };

          const onScanFailure = (error: any) => {
              // Not a QR code, or error. We can ignore, it will keep scanning.
          };

          scanner.render(onScanSuccess, onScanFailure);
          scannerRef.current = scanner;
      }

      return () => {
          if (scannerRef.current) {
              scannerRef.current.clear().catch(error => {
                  console.error("Failed to clear html5-qrcode-scanner.", error);
              });
              scannerRef.current = null;
          }
      };
  }, [hasCameraPermission, onScan]);

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan Part QR Code</DialogTitle>
           <DialogDescription>
            Position the part's QR code inside the frame to scan it.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
            <div id={QR_READER_ID} className="w-full" />
            {hasCameraPermission === false && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera access in your browser to use the QR scanner.
                  </AlertDescription>
              </Alert>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
