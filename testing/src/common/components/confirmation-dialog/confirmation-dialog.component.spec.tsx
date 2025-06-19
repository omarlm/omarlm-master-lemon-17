import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  const titleText = '¿Estás seguro?';
  const contentText = 'Este es el contenido del diálogo';
  const labels = { closeButton: 'Cancelar', acceptButton: 'Aceptar' };

  let onAccept: ReturnType<typeof vi.fn>;
  let onClose: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onAccept = vi.fn();
    onClose = vi.fn();
  });

  it('no renderiza nada si isOpen es false', () => {
    render(
      <ConfirmationDialogComponent
        isOpen={false}
        onAccept={onAccept}
        onClose={onClose}
        title={titleText}
        labels={labels}
      >
        {contentText}
      </ConfirmationDialogComponent>
    );

    // Assert: no debe aparecer el título ni el contenido
    expect(screen.queryByText(titleText)).toBeNull();
    expect(screen.queryByText(contentText)).toBeNull();
  });

  it('muestra título, contenido y botones cuando isOpen es true', () => {
    render(
      <ConfirmationDialogComponent
        isOpen={true}
        onAccept={onAccept}
        onClose={onClose}
        title={titleText}
        labels={labels}
      >
        {contentText}
      </ConfirmationDialogComponent>
    );

    // Assert: título y contenido aparecen
    expect(screen.getByText(titleText)).toBeInTheDocument();
    expect(screen.getByText(contentText)).toBeInTheDocument();

    // Assert: botones con las etiquetas correctas
    expect(
      screen.getByRole('button', { name: labels.closeButton })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: labels.acceptButton })
    ).toBeInTheDocument();
  });

  it('al pulsar "Cancelar" llama solo a onClose', async () => {
    render(
      <ConfirmationDialogComponent
        isOpen={true}
        onAccept={onAccept}
        onClose={onClose}
        title={titleText}
        labels={labels}
      >
        {contentText}
      </ConfirmationDialogComponent>
    );

    // Act: clic en el botón "Cancelar"
    await userEvent.click(
      screen.getByRole('button', { name: labels.closeButton })
    );

    // Assert: onClose debe haberse llamado 1 vez, onAccept 0 veces
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onAccept).not.toHaveBeenCalled();
  });

  it('al pulsar "Aceptar" llama a onAccept y luego a onClose', async () => {
    render(
      <ConfirmationDialogComponent
        isOpen={true}
        onAccept={onAccept}
        onClose={onClose}
        title={titleText}
        labels={labels}
      >
        {contentText}
      </ConfirmationDialogComponent>
    );

    // Act: clic en el botón "Aceptar"
    await userEvent.click(
      screen.getByRole('button', { name: labels.acceptButton })
    );

    // Assert: onAccept y onClose han sido llamados
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);

    // Opcional: comprobar orden de llamadas
    expect(onAccept.mock.invocationCallOrder[0]).toBeLessThan(
      onClose.mock.invocationCallOrder[0]
    );
  });
});
